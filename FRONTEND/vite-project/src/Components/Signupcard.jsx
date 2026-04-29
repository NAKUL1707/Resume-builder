import React from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import loginimage from "../assets/loginimage.png";
import bgimage from "../assets/bgimage.jpg";
import Login from "./Signup";

function Signupcard() {
  const reducedMotion = useReducedMotion();
  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
      };

  return (
    <>
      <div className="relative h-screen bg-slate-950/80 flex justify-center items-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${bgimage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90" />

        <Motion.div
          {...motionProps}
          className="border border-white/10 flex flex-col md:flex-row items-center rounded-2xl bg-gradient-to-br from-slate-900/90 via-indigo-900/90 to-slate-900/90 w-full max-w-[600px] min-h-[400px] md:h-[450px] shadow-2xl shadow-indigo-900/40 relative z-10 backdrop-blur"
        >
          <div className="md:w-1/2 flex flex-col items-center justify-center text-slate-50 order-1 md:order-2">
            <h2 className="text-2xl font-semibold mb-4 text-sky-300">Sign up</h2>
            <img
              src={loginimage}
              alt="loginphoto"
              className="hidden md:block w-auto h-auto max-h-[260px]"
            />
          </div>

          <div className="md:w-1/2 p-5 order-2 md:order-1">
            <Login />
          </div>
        </Motion.div>
      </div>
    </>
  )
}

export default Signupcard;