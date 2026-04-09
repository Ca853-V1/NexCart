import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { Loader } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
  sellerId: {
    _id: string;
    name: string
  }
}

function SellerProducts()
{
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/seller/products`, {
          headers: { Authorization: "Bearer " + token }
        }).then(res=> { setProducts(res.data.products) }).finally(()=>setLoading(false));
  }, [token]);
  if (loading) {
    return(
      <div className="flex justify-center items-center gap-2 mt-20 text-xl">
        <Loader className="animate-spin" size={24}/>
        <span>Loading...</span>
      </div>);}

  return (
    <div className="px-8 py-12">
      <h2 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white">My Products</h2>
      {products.length === 0 ? ( <div className="text-lg text-slate-500">No products created yet.</div>) :
      (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (<ProductCard key={product._id} product={product} />))}
        </div>
      )}
    </div>
  );
}

export default SellerProducts;