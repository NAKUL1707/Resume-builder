import React, { useState } from "react";
import { X, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [Open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  function scroll(){ 
  if(location.pathname === "/"){
    document.getElementById("about")?.scrollIntoView({behavior:"smooth"})
  }else{
    navigate("/#about");
  }
}
  return (
    <nav>
      {/* TOP BAR */}
      <div className="flex justify-between items-center bg-gradient-to-r from-slate-900/90 via-indigo-900/90 to-slate-900/90 backdrop-blur p-4 border-b border-white/5">
        <h1 className="font-bold text-2xl tracking-wide text-white">
          Resume Builder
        </h1>

        {/* MENU ICON */}
        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!Open)}
        >
          {Open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex text-slate-100 gap-8 font-medium">
            <li className="cursor-pointer hover:text-sky-300 transition-colors" onClick={()=>navigate("/")}>Home</li>
            <li className="cursor-pointer hover:text-sky-300 transition-colors" onClick={scroll}>About Us</li>
            <li className="cursor-pointer hover:text-sky-300 transition-colors">Contact Us</li>
          </ul>

          <div className="flex gap-5">
            <button
              className="bg-sky-500/90 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-400 transition-colors"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="bg-indigo-500/90 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-400 transition-colors"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {Open && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur p-4 border-b border-white/5">
          <ul className="flex flex-col gap-4 text-lg font-medium text-slate-100">
            <li className="hover:text-sky-300 transition-colors" onClick={() => { setOpen(false); navigate('/'); }}>Home</li>
            <li className="hover:text-sky-300 transition-colors" onClick={() => { setOpen(false); scroll(); }}>About Us</li>
            <li className="hover:text-sky-300 transition-colors" onClick={() => setOpen(false)}>Contact Us</li>
            <li>
              <button
                className="w-full bg-sky-500/90 text-white py-2 rounded-lg font-semibold hover:bg-sky-400 transition-colors"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="w-full bg-indigo-500/90 text-white py-2 rounded-lg font-semibold hover:bg-indigo-400 transition-colors mt-2"
                onClick={() => navigate("/signup")}>Sign Up</button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
