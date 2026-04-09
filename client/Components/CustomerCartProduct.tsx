import { Minus } from "lucide-react";
import axios from "axios";

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
        }
    };
    quantity: number
}

function CustomerCartProduct({ item }: { item: CartItem })
{
    const token = localStorage.getItem("token");
    const removeItem = async () => {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/customer/cart/${item.product._id}`,
            { headers: { Authorization: "Bearer " + token } }
        );
        window.location.reload();
    };
    
    return (
    <div className="p-4 gap-6 flex rounded-xl overflown-hidden border-4 border-slate-400 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg dark:shadow-xl dark:shadow-black/40">
        <div>
            <img src={item.product.imageLink} alt={item.product.title} className="h-[135px] w-[180px] rounded-xl object-cover"/>
        </div>
        <div className="flex flex-col justify-between flex-1">
            <div>
                <div className="flex justify-between items-center pb-2">
                    <span className="text-2xl font-semibold text-slate-900 dark:text-white">{item.product.title}</span>
                    <div className="flex justify-between">
                        <span className="mr-2 text-2xl font-semibold text-slate-900 dark:text-white">Sold by : {item.product.sellerId?.name}</span>
                        <button onClick={removeItem} className="cursor-pointer rounded-lg border-2 border-[#1976D2] bg-[#1976D2] text-white hover:bg-[#115293] hover:text-white transition-all duration-200 px-1">
                            <Minus size={20}/>
                        </button>
                    </div>
                 </div>
                <p className="text-lg font-semibold text-slate-500 dark:text-slate-400 line-clamp-2">{item.product.description}</p>
            </div>
            <div className="flex justify-end mt-4 gap-6">
                    <div className="text-lg font-semibold text-slate-900 dark:text-white">Quantity : {item.quantity} |</div>
                    <div className="text-lg font-semibold text-slate-900 dark:text-white">Delivery Days : {item.product.deliveryDays} |</div>
                    <div className="text-lg font-bold text-blue-600">Price : ₹{item.product.price.toLocaleString("en-IN")}</div>
            </div>
        </div>
    </div>);
}

export default CustomerCartProduct;