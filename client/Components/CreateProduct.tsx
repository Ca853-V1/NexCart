import { useState } from "react";
import axios from "axios";

function CreateProduct()
{
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [warranty, setWarranty] = useState("");
  const [quantity, setQuantity] = useState("");
  const token = localStorage.getItem("token");
  const handleSubmit = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/seller/products`, { title: title, description: description, price: price, deliveryDays: deliveryDays, imageLink: imageLink, warranty: warranty, quantity: quantity },
    {
      headers: { "Authorization": "Bearer " + token }
    });
    alert("Product Created Successfully ✅");
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <div>
        <img src="/integration.gif" className="mr-20 rounded-xl"/>
      </div>
      <div className="border-4 border-slate-400 dark:border-slate-700 rounded-xl p-5 bg-white dark:bg-slate-800 shadow-lg dark:shadow-xl dark:shadow-black/40">
        <div className="text-2xl font-bold flex justify-center pb-4">Enter Product Details</div>
        <div className="p-2">
            <span className="text-xl mr-24 font-bold">Title</span>
            <input value={title} onChange={(v)=>setTitle(v.target.value)} className="p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="p-2">
            <span className="text-xl mr-7 font-bold">Description</span>
            <input value={description} onChange={(v)=>setDescription(v.target.value)} className="p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="p-2">
            <span className="text-xl mr-22 font-bold">Price</span>
            <input value={price} onChange={(v)=>setPrice(v.target.value)} className="p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="p-2">
            <span className="text-xl mr-2 font-bold">Delivery Days</span>
            <input value={deliveryDays} onChange={(v)=>setDeliveryDays(v.target.value)} className="p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="p-2">
            <span className="text-xl mr-8 font-bold">Image Link</span>
            <input value={imageLink} onChange={(v)=>setImageLink(v.target.value)} className="p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="p-2">
            <span className="text-xl mr-12 font-bold">Warranty</span>
            <input value={warranty} onChange={(v)=>setWarranty(v.target.value)} className="p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="p-2">
            <span className="text-xl mr-13 font-bold">Quantity</span>
            <input value={quantity} onChange={(v)=>setQuantity(v.target.value)} className="p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="p-2">
            <button onClick={handleSubmit} className="px-3 py-1 border-2 border-[#1976D2] text-s text-white font-bold rounded-md cursor-pointer bg-[#1976D2] hover:bg-[#115293]">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;