import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewProduct()
{
    const { id } = useParams();
    const [product, setProductData] = useState({
        title: "",
        description: "",
        price: "",
        deliveryDays: "",
        quantity: "",
        warranty: "",
        imageLink: ""
    });
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/seller/viewproduct/${id}`).then(res=> { setProductData(res.data.product) });
    }, []);

    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 px-6 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="group flex justify-center">
            <div className="relative">
              <img src={product.imageLink} alt={product.title} className="w-[550px] h-[550px] object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105"/>
              <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 dark:ring-white/10"></div>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{product.title}</h1>
              <p className="mt-3 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{product.description}</p>
            </div>
            <div className="text-4xl font-extrabold text-blue-600">₹ {Number(product.price).toLocaleString("en-IN")}</div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span className="opacity-70">Delivery Time</span>
                <span className="font-semibold">{product.deliveryDays} days</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span className="opacity-70">Stock Available</span>
                <span className="font-semibold">{product.quantity}</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span className="opacity-70">Warranty</span>
                <span className="font-semibold">{product.warranty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>);
}

export default ViewProduct;