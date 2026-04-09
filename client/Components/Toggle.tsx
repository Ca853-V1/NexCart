import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function ThemeToggle()
{
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if(savedTheme === "dark")
        {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        }
    }, []);
    const toggleTheme = () => {
        if(isDark)
        {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
        else
        {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        setIsDark(!isDark);
    }

    return (
        <div>
            <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition cursor-pointer" aria-label="Toggle Theme">
                {isDark ? <Sun size={18}/> : <Moon size={18}/>}
            </button>
        </div>);
}

export default ThemeToggle;