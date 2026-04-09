import { Router, Response, Request } from 'express';
import db from '../database/db';
import auth from '../middleware/cust_auth';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import pkg from 'jsonwebtoken';
import { Types } from 'mongoose';

const { Customer, Product, Order } = db;
const { customerAuthenticateJwt } = auth;
const custKey = process.env.JWT_SECRET_CUSTOMER as string;
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

router.get('/profile', customerAuthenticateJwt, async(req: Request, res: Response)=>
{
    const { id } = req.user!;
    const customer = await Customer.findById(id);
    if(!customer)
    {
        return res.status(404).json({ message: "Customer doesn't exist" });
    }
    res.status(200).json({ username: customer.username, name: customer.name, role: 'customer' });
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
    const customerExist = await Customer.findOne({ username });
    if(customerExist)
    {
        return res.status(409).json({ message: "Customer already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 15);
    const newCustomer = new Customer({ name, username, password: hashedPassword });
    await newCustomer.save();
    const token = pkg.sign({ id: newCustomer._id, username, role: "customer" }, custKey, { expiresIn: '1h' });
    res.status(201).json({ message: "Customer account created successfully", token });
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
    const customer = await Customer.findOne({ username });
    if(!customer)
    {
        return res.status(401).json({ message: "Customer doesn't exist" });
    }
    const isPassword = await bcrypt.compare(password, customer.password);
    if(!isPassword)
    {
        return res.status(401).json({ message: "Invalid password" });
    }
    const token = pkg.sign({ id: customer._id, username, role: "customer" }, custKey, { expiresIn: '1h' });
    res.status(200).json({ message: "Logged in successfully", token });
});

router.get('/cart', customerAuthenticateJwt, async(req: Request, res: Response)=>
{
    const customerId = req.user!.id;
    const customer = await Customer.findById(customerId).populate({
        path: 'purchasedProducts.product',
        populate: { path: 'sellerId' } });
    if(!customer)
    {
        return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ products: customer?.purchasedProducts });
});

router.get('/products/:productId', customerAuthenticateJwt, async(req: Request, res: Response)=>
{
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    res.status(200).json({ product });
});

router.post('/cart/:productId', customerAuthenticateJwt, async(req: Request, res: Response)=>
{
    const customerId = req.user!.id;
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if(!product)
    {
        return res.status(404).json({ message: "Product not found" });
    }
    const customer = await Customer.findById(customerId);
    if(!customer)
    {
        return res.status(404).json({ message: "Customer not found" });
    }
    const cartItem = customer.purchasedProducts.find((item)=>item.product.toString() === productId);
    if(cartItem)
    {
        if(cartItem.quantity >= product.quantity)
        {
            return res.status(400).json({ message: "Stock limit reached" });
        }
        cartItem.quantity += 1;
    }
    else
    {
        if(product.quantity < 1)
        {
            return res.status(400).json({ message: "Out of stock" });
        }
        customer.purchasedProducts.push({
            product: product._id,
            quantity: 1
        });
    }
    await customer.save();
    res.status(200).json({ message: 'Product added to cart' });
});

router.delete('/cart/:productId', customerAuthenticateJwt, async(req: Request, res: Response)=>
{
    const customerId = req.user!.id;
    const { productId } = req.params;
    const customer = await Customer.findById(customerId);
    if(!customer)
    {
        return res.status(404).json({ message: "Customer not found "});
    }
    const itemIndex = customer.purchasedProducts.findIndex((item)=> item.product.toString() === productId);
    if(itemIndex === -1)
    {
        return res.status(400).json({ message: "Product not in cart" });
    }
    const item = customer.purchasedProducts[itemIndex] as {
        product: Types.ObjectId;
        quantity: number
    };
    if(item.quantity > 1)
    {
        item.quantity -= 1;
    }
    else
    {
        customer.purchasedProducts.splice(itemIndex, 1);
    }
    await customer.save();
    res.status(200).json({ message: "Product removed successfully" });
});

router.post('/pay', customerAuthenticateJwt, async(req: Request, res: Response)=>
{
    const customerId = req.user!.id;
    const customer = await Customer.findById(customerId).populate('purchasedProducts.product');
    if(!customer || customer.purchasedProducts.length === 0)
    {
        return res.status(400).json({ message: "Cart is empty" });
    }
    let totalAmount = 0;
    const orderItems = customer.purchasedProducts.map((item: any) => {
        const price = item.product.price;
        totalAmount += price*item.quantity;
        return {
            product: item.product._id,
            quantity: item.quantity,
            price
        };
    });
    const order = new Order({
        customerId,
        items: orderItems,
        totalAmount
    });
    await order.save();
    customer.purchasedProducts = [];
    res.status(200).json({ message: "Payment Successful", order });
});

router.get('/orders', customerAuthenticateJwt, async(req: Request, res: Response)=>
{
    const customerId = req.user!.id;
    const orders = await Order.find({ customerId }).sort({ createdAt: -1 }).limit(5).populate('items.product');
    res.status(200).json({ orders });
});

export default router;