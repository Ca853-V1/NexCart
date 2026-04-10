import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import SectionImage from "./SectionImage";
import HomeProductCard from "./HomeProductCard";
import CustomerProductCard from "./CustomerProductCard";
import axios from "axios";

const images = [
  "/public/banners/1.jpg",
  "./public/banners/2.jpg",
  "/banners/3.jpg",
  "/banners/4.jpg",
  "/banners/5.jpg",
  "/banners/6.jpg",
];

function Home({ search }: { search: string })
{
  const [curr, setCurr] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<number | null>(null);
  const role = localStorage.getItem("role");

  const filteredProducts = products.filter((product) =>
  {
    const query = search.toLowerCase();
    return (
      product.title?.toLowerCase().includes(query) || product.sellerId?.name.toLowerCase().includes(query)
    );
  });
  const startAutoSlide = () =>
  {
    intervalRef.current = window.setInterval(() => {
      setCurr((prev) => (prev + 1) % images.length);
    }, 3000);
  };
  const stopAutoSlide = () =>
  {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoSlide();
    setLoading(false);
    return stopAutoSlide;
  }, []);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/seller/all-products`).then(res => { setProducts(res.data.products); })
      .catch((err) => console.error("Product fetch error:", err)).finally(() => setLoading(false));
    }, []);

  const prevSlide = () => { setCurr((prev) => (prev === 0 ? images.length - 1 : prev - 1)); };
  const nextSlide = () => { setCurr((prev) => (prev + 1) % images.length); };
  if (loading)
  {
    return(
      <div className="flex justify-center items-center gap-2 mt-20 text-xl">
        <Loader className="animate-spin" size={24} />
        <span>Loading...</span>
      </div>);
  }

  if(role === "customer")
  {
    return (
      <div>
        <div className="p-2 rounded-4xl relative w-full h-[50vh] overflow-hidden" onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
          <img src={images[curr]} className="w-full h-full object-cover transition-all duration-700"/>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 cursor-pointer"><ChevronLeft size={30}/></button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 cursor-pointer"><ChevronRight size={30}/></button>
        </div>
        <SectionImage/>
        <div className="px-8 py-12">
            <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-white">Latest Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (<CustomerProductCard key={product._id} product={product}/>))}
            </div>
          </div>
      </div>
    )
  }
  return (
    <div>
      <div className="p-2 rounded-4xl relative w-full h-[50vh] overflow-hidden" onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
        <img src={images[curr]} className="w-full h-full object-cover transition-all duration-700"/>
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 cursor-pointer"><ChevronLeft size={30}/></button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 cursor-pointer"><ChevronRight size={30}/></button>
      </div>
      <SectionImage/>
      <div className="px-8 py-12">
          <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-white">Latest Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (<HomeProductCard key={product._id} product={product}/>))}
          </div>
        </div>
    </div>);
}

export default Home;