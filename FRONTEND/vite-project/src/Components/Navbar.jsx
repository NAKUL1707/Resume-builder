import { useState, useEffect } from "react";
import { X, Menu, LogOut, FileText, LayoutTemplate } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { isAuthenticated } from "../utils/api";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, [location.pathname]);

  function scrollToAbout() {
    if (location.pathname === "/") {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#about");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    setOpen(false);
    navigate("/");
  }

  const authLinks = (
    <>
      <Link
        to="/templates"
        className="inline-flex items-center gap-1.5 text-slate-200 hover:text-sky-300 transition-colors text-sm font-medium"
        onClick={() => setOpen(false)}
      >
        <LayoutTemplate size={15} />
        Templates
      </Link>
      <Link
        to="/builder"
        className="inline-flex items-center gap-1.5 text-slate-200 hover:text-sky-300 transition-colors text-sm font-medium"
        onClick={() => setOpen(false)}
      >
        <FileText size={15} />
        Builder
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-red-300 transition-colors text-sm font-medium"
      >
        <LogOut size={15} />
        Logout
      </button>
    </>
  );

  const guestLinks = (
    <>
      <button
        type="button"
        className="bg-sky-500/90 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-400 transition-colors"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
      <button
        type="button"
        className="bg-indigo-500/90 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-400 transition-colors"
        onClick={() => navigate("/signup")}
      >
        Sign up
      </button>
    </>
  );

  return (
    <nav className="sticky top-0 z-30">
      <div className="flex justify-between items-center bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-white/5">
        <Link
          to="/"
          className="font-bold text-xl tracking-tight text-white hover:text-sky-200 transition-colors"
        >
          Resume<span className="text-sky-400">Builder</span>
        </Link>

        <button
          type="button"
          className="lg:hidden text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex text-slate-300 gap-6 text-sm font-medium">
            <li>
              <button type="button" className="hover:text-sky-300 transition-colors" onClick={() => navigate("/")}>
                Home
              </button>
            </li>
            <li>
              <button type="button" className="hover:text-sky-300 transition-colors" onClick={scrollToAbout}>
                About
              </button>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            {loggedIn ? authLinks : guestLinks}
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-md p-4 border-b border-white/5">
          <ul className="flex flex-col gap-3 text-sm font-medium">
            <li>
              <button type="button" className="text-slate-200 hover:text-sky-300 w-full text-left" onClick={() => { setOpen(false); navigate("/"); }}>
                Home
              </button>
            </li>
            <li>
              <button type="button" className="text-slate-200 hover:text-sky-300 w-full text-left" onClick={() => { setOpen(false); scrollToAbout(); }}>
                About
              </button>
            </li>
            {loggedIn ? (
              <>
                <li><Link to="/templates" className="text-slate-200 hover:text-sky-300 block" onClick={() => setOpen(false)}>Templates</Link></li>
                <li><Link to="/builder" className="text-slate-200 hover:text-sky-300 block" onClick={() => setOpen(false)}>Builder</Link></li>
                <li>
                  <button type="button" className="text-red-400 hover:text-red-300 w-full text-left" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="flex flex-col gap-2 pt-2">
                <button type="button" className="bg-sky-500 text-white py-2 rounded-lg font-semibold" onClick={() => { setOpen(false); navigate("/login"); }}>
                  Login
                </button>
                <button type="button" className="bg-indigo-500 text-white py-2 rounded-lg font-semibold" onClick={() => { setOpen(false); navigate("/signup"); }}>
                  Sign up
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
