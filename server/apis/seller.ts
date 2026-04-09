import { Router, Request, Response } from 'express';
import db from '../database/db';
import auth from '../middleware/seller_auth';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import pkg from 'jsonwebtoken';

const { Seller, Product } = db;
const { sellerAuthenticateJwt } = auth;
const sellerKey = process.env.JWT_SECRET_SELLER as string;
const router = Router();
const signupInput = z.object({
    name: z.string().min(6).max(24),
    username: z.email(),
    password: z.string().min(6).max(12)
});
const loginInput = z.object({
    username: z.email(),
    password: z.string().min(6).max(12)
});

router.get('/profile', sellerAuthenticateJwt, async(req: Request, res: Response)=>
{
    const { id } = req.user!;
    const seller = await Seller.findById(id);
    if(!seller)
    {
        return res.status(404).json({ message: "Seller not found" });
    }
    res.status(200).json({ username: seller.username, name: seller.name, role: 'seller' });
});

router.post('/signup', async(req: Request, res: Response)=>
{
    const parsedInput = signupInput.safeParse(req.body);
    if(!parsedInput.success)
    {
        return res.status(401).json({ error: parsedInput.error });
    }
    const name = parsedInput.data.name;
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    const sellerExist = await Seller.findOne({ username });
    if(sellerExist)
    {
        return res.status(409).json({ message: "Seller already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 15);
    const newSeller = new Seller({ name, username, password: hashedPassword });
    await newSeller.save();
    const token = pkg.sign({ id: newSeller._id, username, role: 'seller' }, sellerKey, { expiresIn: '1h' });
    res.status(201).json({ message: "Seller account created successfully", token });
});

router.post('/login', async(req: Request, res: Response)=>
{
    const parsedInput = loginInput.safeParse(req.body);
    if(!parsedInput.success)
    {
        return res.status(401).json({ error: parsedInput.error });
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    const seller = await Seller.findOne({ username });
    if(!seller)
    {
        return res.status(401).json({ message: "Seller doesn't exist" });
    }
    const isPassword = await bcrypt.compare(password, seller.password);
    if(!isPassword)
    {
        return res.status(401).json({ message: "Invalid Password" });
    }
    const token = pkg.sign({ id: seller._id, username, role: 'seller' }, sellerKey, { expiresIn: '1h' });
    res.status(200).json({ message: "Logged In successfully", token });
});

router.get('/products', sellerAuthenticateJwt, async(req: Request, res: Response)=>
{
    const sellerId = req.user!.id;
    const products = await Product.find({ sellerId }).populate("sellerId", "name");
    res.status(200).json({ products });
});

router.get('/all-products', async(req: Request, res: Response)=>
{
    const products = await Product.find().populate("sellerId", "name");
    res.status(200).json({ products });
});

router.get('/product/:productId', sellerAuthenticateJwt, async(req: Request, res: Response)=>
{
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate("sellerId", "name");
    res.status(200).json({ product });
});

router.get('/viewproduct/:productId', async(req: Request, res: Response)=>
{
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate("sellerId", "name");
    res.status(200).json({ product });
});

router.post('/products', sellerAuthenticateJwt, async(req: Request, res: Response)=>
{
    const product = new Product({
        ...req.body,
        sellerId: req.user!.id
    });
    await product.save();
    res.status(201).json({ message: "Product created successfully", productId: product._id });
});

router.put('/product/:productId', sellerAuthenticateJwt, async(req: Request, res: Response)=>
{
    const { productId } = req.params;
    const sellerId = req.user!.id;
    const product = await Product.findOneAndUpdate({ _id: productId, sellerId: sellerId }, req.body, { new:true });
    if(product)
    {
        return res.status(200).json({ message: "Product details updated successfully", product });
    }
    return res.status(404).json({ message: "Product not found" });
});

router.delete('/product/:productId', sellerAuthenticateJwt, async(req: Request, res: Response)=>
{
    const { productId } = req.params;
    const sellerId = req.user!.id;
    const product = await Product.findOneAndDelete({ _id: productId, sellerId: sellerId });
    if(product)
    {
        return res.status(200).json({ message: "Product deleted successfully" });
    }
    return res.status(404).json({ message: "Product not found" });
});

export default router;