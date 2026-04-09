import { useNavigate } from "react-router-dom";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import axios from "axios";
import { useState } from "react";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  imageLink: string;
  sellerId: {
    _id: string;
    name: string
  }
}

function CustomerProductCard({ product }: { product: Product })
{
    const navigate = useNavigate();
    const id = product._id;
    const token = localStorage.getItem("token");
    const [qty, setQty] = useState(0);
    const addproduct = async () => {
      try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/customer/cart/${id}`, {},
          {
            headers: { Authorization: "Bearer " + token }
          });
      setQty(prev => Math.min(product.quantity, prev + 1));
      } catch (err) {
          console.error("Add failed:", err);
      }};
    const deleteproduct = async () => {
      try {
          await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/customer/cart/${id}`,
          {
              headers: { Authorization: "Bearer " + token }
          });
          setQty(prev => Math.max(0, prev - 1));
      } catch (err) {
          console.error("Delete failed:", err);
      }};
  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-white-500 dark:bg-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-[405px]">
      <div onClick={() => navigate(`/seller/viewproduct/${product._id}`)} className="cursor-pointer h-64 overflow-hidden bg-gray-100">
        <img src={product.imageLink} alt={product.title} className="w-full h-full object-cover"/>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-slate-900 dark:text-white">{product.title}</span>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">Sold by : {product.sellerId?.name}</span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between mt-auto">
            <span className="text-blue-600 font-bold text-lg">₹ {product.price.toLocaleString("en-IN")}</span>
            <span className="text-lg font-semibold text-slate-900 dark:text-white">In Cart: {qty}</span>
            <span className="flex justify-center gap-2">
                <button onClick={deleteproduct} disabled={qty === 0} className="rounded-full bg-gray-300 dark:bg-slate-700 hover:bg-gray-400 dark:hover:bg-slate-600 transition cursor-pointer"><Minus size={24}/></button>
                <ShoppingBag size={24}/>
                <button onClick={addproduct} disabled={qty === product.quantity} className="rounded-full bg-gray-300 dark:bg-slate-700 hover:bg-gray-400 dark:hover:bg-slate-600 transition cursor-pointer"><Plus size={24}/></button>
            </span>
        </div>
      </div>
    </div>
  );
}

export default CustomerProductCard;