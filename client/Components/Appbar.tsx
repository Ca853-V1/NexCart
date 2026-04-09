import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Store, User, House } from "lucide-react";
import ThemeToggle from "./Toggle";
import axios from "axios";

function Appbar({ search, setSearch }: { search: string; setSearch: React.Dispatch<React.SetStateAction<string>> })
{
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const role = localStorage.getItem("role");
  useEffect( () => {
    const token = localStorage.getItem("token");
    if(!token || !role)
    {
      return;
    }
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/${role}/profile`, 
      {
        headers: { "Authorization": "Bearer " + token }
      }).then(res=>{ setName(res.data.name); }).catch((err)=>{ console.error("Error fetching profile", err); });
  }, [role]);
  const logout = () => {
    localStorage.clear();
    setName("");
    navigate("/");
  }
  if(role === "seller")
  { 
    return (<div className="sticky top-0 z-50 flex justify-between items-center h-16 border-y border-slate-400 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
              <div className="flex justify-start items-center">
                <button onClick={() => navigate("/")} className="cursor-pointer ml-5 px-3 py-1 rounded-lg border-2 border-[#1976D2] bg-[#1976D2] text-white hover:bg-[#115293] hover:text-white transition-all duration-200"><House strokeWidth={2.5} size={24}/></button>
                <img className="w-15 h-10 ml-2" src="/logo.png"/>
                <span className="text-indigo-600 group inline-block text-2xl font-bold select-none transition-transform duration-300 hover:scale-110">
                  <span className="text-indigo-600">Nex</span>
                  <span className="text-emerald-500 inline-block transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(360deg)]">C</span>
                  <span className="text-emerald-500">art</span>
                </span>
              </div>
              <div className="relative w-[32rem] flex rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 focus-within:ring-2 focus-within:ring-[#1976D2]">
                <input value={search} onChange={(v)=>setSearch(v.target.value)} className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none" placeholder="Search Items"/>
                <button className="px-4 bg-[#1976D2] cursor-pointer hover:bg-[#115293] dark:bg-slate-700 dark:hover:bg-slate-600 transition flex items-center justify-center">
                  <Search className="text-white" size={20} strokeWidth={2.5}/>
                </button>
              </div>
              <div className="flex items-center gap-3 pr-5">
                <ThemeToggle/>
                <button onClick={()=>navigate("/seller/addproduct")} className="cursor-pointer px-3 py-1 border-2 border-[#1976D2] text-white font-bold rounded-md bg-[#1976D2] hover:bg-[#115293]">Create Product</button>
                <button onClick={()=>navigate("/seller/products")} className="cursor-pointer px-3 py-1 border-2 border-[#1976D2] text-white font-bold rounded-md bg-[#1976D2] hover:bg-[#115293]">View Products</button>
                <div className="flex items-center gap-2 px-3 py-1 border border-slate-400 dark:border-slate-600 rounded-full">
                  <Store size={16}/>
                  <span className="font-semibold">{ name }</span>
                </div>
                <button onClick={logout} className="cursor-pointer px-3 py-1 border-2 border-red-500 text-red-500 font-semibold rounded-md hover:bg-red-500 hover:text-white">Logout</button>
              </div>
            </div>);
  }
  if(role === "customer")
  {
    return (<div className="sticky top-0 z-50 flex justify-between items-center h-16 border-y border-slate-400 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
              <div className="flex justify-start items-center">
                <button onClick={() => navigate("/")} className="cursor-pointer ml-5 px-3 py-1 rounded-lg border-2 border-[#1976D2] bg-[#1976D2] text-white hover:bg-[#115293] hover:text-white transition-all duration-200"><House strokeWidth={2.5} size={24}/></button>
                <img className="w-15 h-10 ml-2" src="/logo.png"/>
                <span className="text-indigo-600 group inline-block text-2xl font-bold select-none transition-transform duration-300 hover:scale-110">
                  <span className="text-indigo-600">Nex</span>
                  <span className="text-emerald-500 inline-block transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(360deg)]">C</span>
                  <span className="text-emerald-500">art</span>
                </span>
              </div>
              <div className="relative w-[32rem] flex rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 focus-within:ring-2 focus-within:ring-[#1976D2]">
                <input value={search} onChange={(v)=>setSearch(v.target.value)} className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none" placeholder="Search Items"/>
                <button className="px-4 bg-[#1976D2] cursor-pointer hover:bg-[#115293] dark:bg-slate-700 dark:hover:bg-slate-600 transition flex items-center justify-center">
                  <Search className="text-white" size={20} strokeWidth={2.5}/>
                </button>
              </div>
              <div className="flex items-center gap-3 pr-5">
                <ThemeToggle/>
                <button onClick={()=>navigate("/customer/cart")} className="cursor-pointer px-3 py-1 border-2 border-[#1976D2] text-white font-bold rounded-md bg-[#1976D2] hover:bg-[#115293]"><ShoppingCart strokeWidth={2.5} size={24}/></button>
                <div className="flex items-center gap-2 px-3 py-1 border border-slate-400 dark:border-slate-600 rounded-full">
                  <User size={16}/>
                  <span className="font-semibold">{ name }</span>
                </div>
                <button onClick={logout} className="cursor-pointer px-3 py-1 border-2 border-red-500 text-red-500 font-semibold rounded-md hover:bg-red-500 hover:text-white">Logout</button>
              </div>
            </div>);
  }
  return (<div className="sticky top-0 z-50 flex justify-between items-center h-16 border-y border-slate-400 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <div className="flex justify-start items-center">
              <button onClick={() => navigate("/")} className="cursor-pointer ml-5 px-3 py-1 rounded-lg border-2 border-[#1976D2] bg-[#1976D2] text-white hover:bg-[#115293] hover:text-white transition-all duration-200"><House strokeWidth={2.5} size={24}/></button>
              <img className="w-15 h-10 ml-2" src="/logo.png"/>
              <span className="text-indigo-600 group inline-block text-2xl font-bold select-none transition-transform duration-300 hover:scale-110">
                <span className="text-indigo-600">Nex</span>
                <span className="text-emerald-500 inline-block transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(360deg)]">C</span>
                <span className="text-emerald-500">art</span>
              </span>
            </div>
            <div className="relative w-[32rem] flex rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 focus-within:ring-2 focus-within:ring-[#1976D2]">
                <input value={search} onChange={(v)=>setSearch(v.target.value)} className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none" placeholder="Search Items"/>
                <button className="px-4 bg-[#1976D2] cursor-pointer hover:bg-[#115293] dark:bg-slate-700 dark:hover:bg-slate-600 transition flex items-center justify-center">
                  <Search className="text-white" size={20} strokeWidth={2.5}/>
                </button>
            </div>
            <div className="flex items-center gap-3 pr-5">
              <ThemeToggle/>
              <button onClick={()=>navigate("/login")} className="cursor-pointer px-3 py-1 border-2 border-[#1976D2] text-white font-bold rounded-md bg-[#1976D2] hover:bg-[#115293]">Login</button>
              <button onClick={()=>navigate("/signup")} className="cursor-pointer px-3 py-1 border-2 border-[#1976D2] text-white font-bold rounded-md bg-[#1976D2] hover:bg-[#115293]">Signup</button>
            </div>
          </div>);
}

export default Appbar;