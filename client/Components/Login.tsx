import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("customer");
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${role}/login`, { username: username, password: password });
            const data = response.data;
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", role);
            navigate("/");
        }
        catch(err) {
            console.error("Login failed", err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
            <div className="border-4 border-slate-400 dark:border-slate-700 rounded-xl p-5 bg-white dark:bg-slate-800 shadow-lg dark:shadow-xl dark:shadow-black/40">
                <div className="text-2xl font-bold flex justify-center pb-4">Enter Login Credentials</div>
                <div className="p-2">
                    <span className="text-xl mr-2 font-bold">Username</span>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)} className="p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="p-2">
                    <span className="text-xl mr-3 font-bold">Password</span>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} className="p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" type="password"/>
                </div>
                <div className="p-2">
                    <span className="text-xl mr-15 font-bold">Role</span>
                    <select value={role} onChange={(e)=>setRole(e.target.value)} className="cursor-pointer p-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>
                <div className="p-2">
                    <button onClick={handleLogin} className="px-3 py-1 border-2 border-[#1976D2] text-s text-white font-bold rounded-md cursor-pointer bg-[#1976D2] hover:bg-[#115293]">LOG IN</button>
                </div>
            </div>
        </div>
    );
}

export default Login;