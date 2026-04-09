import { useNavigate } from "react-router-dom";

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

function HomeProductCard({ product }: { product: Product })
{
  const navigate = useNavigate();
  
  return (
    <div onClick={() => navigate(`/seller/viewproduct/${product._id}`)} className="flex flex-col h-[405px] cursor-pointer rounded-xl overflow-hidden shadow-md bg-white-500 dark:bg-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="h-64 overflow-hidden bg-gray-100">
        <img src={product.imageLink} alt={product.title} className="w-full h-full object-cover"/>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-slate-900 dark:text-white">{product.title}</span>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">Sold by : {product.sellerId?.name}</span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">{product.description}</p>
        <div className="mt-auto text-blue-600 font-bold text-lg">₹ {product.price.toLocaleString("en-IN")}</div>
      </div>
    </div>
  );
}

export default HomeProductCard;