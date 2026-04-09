import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import axios from "axios";

function UpdateProduct()
{
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    deliveryDays: "",
    imageLink: "",
    warranty: "",
    quantity: ""
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/seller/product/${id}`,
        {
          headers: { Authorization: "Bearer " + token }
        }).then(res=> { setProductData(res.data.product) }).finally(() => setLoading(false));
  }, []);
  const handleUpdate = async () => {
    await axios.put(`${import.meta.env.VITE_API_URL}/seller/product/${id}`, { ...product, price: Number(product.price), deliveryDays: Number(product.deliveryDays), quantity: Number(product.quantity)  },
      {
        headers: { Authorization: "Bearer " + token }
      }
    );
    alert("Product updated successfully");
  }
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;
    await axios.delete(`${import.meta.env.VITE_API_URL}/seller/product/${id}`,
      {
        headers: { Authorization: "Bearer " + token }
      }
    );
    alert("Product deleted successfully");
    navigate("/seller/products");
  }
  if (loading)
  {
    return(
      <div className="flex justify-center items-center gap-2 mt-20 text-xl">
        <Loader className="animate-spin" size={24} />
        <span>Loading...</span>
      </div>);
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <img src="/update.gif" className="mr-20"/>
      <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg w-[500px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Product</h2>
        <div className="p-2">
            <span className="text-xl mr-24 font-bold">Title</span>
            <input value={product.title} onChange={(v)=>setProductData({ ...product, title: v.target.value })} className="w-[295px] p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="p-2">
            <span className="text-xl mr-7 font-bold">Description</span>
            <input value={product.description} onChange={(v)=>setProductData({ ...product, description: v.target.value })} className="w-[295px] p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="p-2">
            <span className="text-xl mr-22 font-bold">Price</span>
            <input value={product.price} onChange={(v)=>setProductData({ ...product, price: v.target.value })} className="w-[295px] p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="p-2">
            <span className="text-xl mr-2 font-bold">Delivery Days</span>
            <input value={product.deliveryDays} onChange={(v)=>setProductData({ ...product, deliveryDays: v.target.value })} className="w-[295px] p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="p-2">
            <span className="text-xl mr-8 font-bold">Image Link</span>
            <input value={product.imageLink} onChange={(v)=>setProductData({ ...product, imageLink: v.target.value })} className="w-[295px] p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="p-2">
            <span className="text-xl mr-12 font-bold">Warranty</span>
            <input value={product.warranty} onChange={(v)=>setProductData({ ...product, warranty: v.target.value })} className="w-[295px] p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="p-2">
            <span className="text-xl mr-13 font-bold">Quantity</span>
            <input value={product.quantity} onChange={(v)=>setProductData({ ...product, quantity: v.target.value })} className="w-[295px] p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="flex justify-between mt-6">
          <button onClick={handleUpdate} className="cursor-pointer px-3 py-1 border-2 border-[#1976D2] text-white font-bold rounded-md bg-[#1976D2] hover:bg-[#115293]">Update</button>
          <button onClick={handleDelete} className="cursor-pointer px-3 py-1 border-2 border-red-500 text-red-500 font-semibold rounded-md hover:bg-red-500 hover:text-white">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;