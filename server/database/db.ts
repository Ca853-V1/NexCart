import { Schema, model, Types } from 'mongoose';

interface PurchasedProduct {
    product: Types.ObjectId;
    quantity: number
}
interface Customer {
    username: string;
    password: string;
    name: string;
    purchasedProducts: PurchasedProduct[]
}
interface Seller {
    username: string;
    password: string;
    name: string
}
interface Product {
    title: string;
    description: string;
    price: number;
    deliveryDays :number;
    imageLink: string;
    warranty: string;
    quantity: number;
    sellerId: Types.ObjectId
}
interface OrderItem {
    product: Types.ObjectId;
    quantity: number;
    price: number
}
interface Order {
    customerId: Types.ObjectId;
    items: OrderItem[];
    totalAmount: number;
    createdAt: Date
}

const PurchasedProductSchema = new Schema<PurchasedProduct>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required:true, min: 1}
});
const customerSchema = new Schema<Customer>({
    username: String,
    password: String,
    name: String,
    purchasedProducts:[PurchasedProductSchema]
});
const sellerSchema = new Schema<Seller>({
    username: String,
    password: String,
    name: String
});
const productSchema = new Schema<Product>({
    title: String,
    description: String,
    price: Number,
    deliveryDays: Number,
    imageLink: String,
    warranty: String,
    quantity: Number,
    sellerId: { type: Schema.Types.ObjectId, ref: 'Seller'}
});
const OrderItemSchema = new Schema<OrderItem>({
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    price: Number
});
const OrderSchema = new Schema<Order>({
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    items: [OrderItemSchema],
    totalAmount: Number,
    createdAt: { type: Date, default: Date.now }
});

const Customer = model<Customer>('Customer', customerSchema);
const Seller = model<Seller>('Seller', sellerSchema);
const Product = model<Product>('Product', productSchema);
const Order = model<Order>('Order', OrderSchema);

export default
{
    Customer, Seller, Product, Order
}