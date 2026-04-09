import { useEffect, useState } from "react";
import { Loader, ShoppingBasket, Smile, Download } from "lucide-react";
import axios from "axios";
import CustomerCartProduct from "./CustomerCartProduct";
import jsPDF from "jspdf";

interface CartItem {
    product: {
        _id: string;
        title: string;
        description: string;
        price: number;
        imageLink: string;
        deliveryDays: number;
        sellerId: {
            _id: string;
            name: string
        };
    };
    quantity: number
}
interface OrderItem {
    product: {
        _id: string;
        title: string;
        price: number
    };
    quantity: number
}
interface Order {
    _id: string;
    totalAmount: number;
    createdAt: string;
    items: OrderItem[]
}

function CustomerCart()
{
    const [products, setProducts] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);
    const [showOrders, setShowOrders] = useState(false);
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/customer/cart`, {
            headers: { Authorization: "Bearer " + token }
        }).then(res=> { setProducts(res.data.products) }).finally(()=>setLoading(false));
    }, [token]);
    if(loading)
    {
        return (<div className="flex justify-center gap-2 mt-20 text-xl">
                    <Loader className="animate-spin" size={24}/>
                    <span>Loading...</span>
                </div>);
    }
    const totalAmount = products.reduce((acc, item) => {
        return acc + (item.product.price*item.quantity);
    }, 0);
    const handlePay = async() => {
        await axios.post(`${import.meta.env.VITE_API_URL}/customer/pay`, {},
            { headers: { Authorization: "Bearer " + token } }
        );
        alert("Payment Successful 💸");
        setProducts([]);
    }
    const handleOrderHistory = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/customer/orders`,
            { headers: { Authorization: "Bearer " + token } }
        );
        setOrders(res.data.orders);
    }
    const toRoman = (num: number) => {
        const roman = [ "i","ii","iii","iv","v","vi","vii","viii","ix","x","xi","xii","xiii","xiv","xv","xvi","xvii","xviii","xix","xx","xxi","xxii","xxiii","xxiv","xxv","xxvi","xxvii","xxviii","xxix","xxx" ];
        return roman[num - 1] || num;
    };
    const downloadReceipt = () => {
        const pdf = new jsPDF();
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.text("NexCart Receipt", 20, 20);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(11);
        pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 140, 20);
        let y = 35;
        pdf.setFontSize(12);
        pdf.text("Product", 25, y);
        pdf.text("Qty", 120, y);
        pdf.text("Amount", 160, y);
        pdf.line(20, y + 3, 190, y + 3);
        y += 12;
        orders.forEach((order, index) => {
            if (y > 270)
            {
                pdf.addPage();
                y = 30;
            }
            pdf.setFontSize(12);
            const purchaseDate = new Date(order.createdAt).toLocaleDateString("en-GB");
            pdf.text(`${index + 1}) Order ID: ${order._id.slice(-6)} (purchased on ${purchaseDate})`, 20, y);
            y += 10;
            order.items.forEach((item, itemIndex) => {
                const itemTotal = item.product.price * item.quantity;
                pdf.setFontSize(11);
                pdf.text(`(${toRoman(itemIndex + 1)}) ${item.product.title}`, 25, y);
                pdf.text(`x${item.quantity}`, 120, y);
                pdf.text(`Rs. ${itemTotal.toLocaleString("en-IN")}`, 160, y);
                y += 8;
                if (y > 270)
                {
                    pdf.addPage();
                    y = 30;
                }
            });
            pdf.line(120, y, 190, y);
            y += 8;
            pdf.setFontSize(12);
            pdf.text(`Total: Rs. ${order.totalAmount.toLocaleString("en-IN")}`, 120, y);
            y += 10;
            pdf.line(20, y, 190, y);
            y += 15;
        });
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "italic");
        const footerText = "Thank you for shopping. Visit again!";
        const pageWidth = pdf.internal.pageSize.getWidth();
        const textWidth = pdf.getTextWidth(footerText);
        const x = (pageWidth - textWidth) / 2;
        pdf.text(footerText, x, y);
        pdf.save("receipt.pdf");
    };
    
    return (
        <div className="px-8 py-8">
                <h2 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white">Products in Cart</h2>
                {products.length === 0 ? (
                    <div className="text-lg text-slate-500 flex justify-start gap-2">
                        <div>Cart empty! Mind shopping something</div>
                        <Smile size={30}/>
                        <ShoppingBasket size={30}/>
                    </div>) :
                    (<div>
                        <div className="space-y-6">
                            {products.map((item) => (
                                <CustomerCartProduct key={item.product._id} item={item}/>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-between gap-5 items-center">
                            <button onClick={() => {handleOrderHistory(); setShowOrders(true);}}
                                className="px-5 py-2 text-lg font-semibold cursor-pointer rounded-lg border-2 border-[#1976D2] bg-[#1976D2] text-white hover:bg-[#115293] transition-all duration-200">Order History</button>
                            <div className="flex justify-end gap-5">
                                <div className="text-3xl font-bold text-blue-600">
                                    Bill Amount - ₹ {totalAmount.toLocaleString("en-IN")}
                                </div>
                                <button onClick={handlePay}
                                    className="cursor-pointer text-lg px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">Pay Bill</button>
                            </div>
                        </div>
                    </div>)}
                {showOrders && (
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg w-[600px] max-h-[80vh] overflow-y-auto p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Recent Orders</h3>
                                <div className="flex items-center">
                                    <button onClick={downloadReceipt} className="mr-3 p-2 rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition cursor-pointer">
                                        <Download size={24}/>
                                    </button>
                                    <button onClick={() => setShowOrders(false)} className="cursor-pointer px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition">Close</button>
                                </div>
                            </div>
                            {orders.length === 0 ? (
                                <div className="text-slate-500 text-lg">No previous orders found</div>) :
                                (   <div id="receipt" className="space-y-5" style={{ backgroundColor: "white", color: "black" }}>
                                        {orders.map((order: any) => (
                                            <div key={order._id} className="border rounded-lg p-4 shadow-sm">
                                                <div className="flex justify-between mb-2">
                                                    <div className="font-semibold text-slate-700 dark:text-white">Order ID: {order._id.slice(-6)}</div>
                                                    <div className="font-bold text-blue-600">₹ {order.totalAmount.toLocaleString("en-IN")}</div>
                                                </div>
                                                <div className="text-sm text-slate-500 mb-2">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="space-y-1">
                                                    {order.items.map((item: any) => (
                                                        <div key={item.product._id} className="flex justify-between text-sm">
                                                            <span>{item.product.title}</span>
                                                            <span>x{item.quantity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}</div>
                    </div>
                )}
        </div>);
}

export default CustomerCart;