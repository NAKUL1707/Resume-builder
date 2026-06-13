import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useReducedMotion } from "framer-motion";
import main_photo from "../assets/main_photo.png";

function Landing() {
  const reducedMotion = useReducedMotion();

  const heroMotionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7 },
      };

  const featuresMotionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6 },
      };

  return (
    <div className="bg-slate-950/80 text-slate-100 min-h-screen">
      <div className="text-white min-h-screen flex items-center">

        {/* Container */}
        <div className="mx-auto max-w-7xl px-6 w-full">

          <Motion.div
            {...heroMotionProps}
            className="grid items-center gap-12 lg:grid-cols-2"
          >

            {/* LEFT — TEXT */}
            <div className="text-center lg:text-left">

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
                  Build Your Resume
                </span>
                <br />
                <span className="text-slate-100/90 text-[0.9em]">
                  In Minutes, Not Hours
                </span>
              </h1>

              <p className="text-slate-300 mt-6 max-w-xl mx-auto lg:mx-0">
                A simple and powerful resume builder made for freshers & students.
                No design skills required.
              </p>

              <div className="mt-8 flex gap-4 justify-center lg:justify-start">
                <Link
                  to="/signup"
                  className="px-6 py-3 rounded-xl font-semibold transition bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white shadow-lg shadow-sky-900/40"
                >
                  Get Started Free
                </Link>
              </div>

            </div>

            {/* RIGHT — IMAGE */}
            <div className="flex justify-center lg:justify-end">

              <div className="relative w-full max-w-md sm:max-w-lg">

                {/* Glow */}
                <div className="absolute -inset-6 rounded-3xl bg-blue-500/10 blur-2xl" />

                {/* Image */}
                <Motion.img
                  src={main_photo}
                  alt="Resume builder"
                  className="relative w-full h-auto object-contain"
                  initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                />

              </div>

            </div>

          </Motion.div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6" id="about">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-100">
          Why Choose Our Resume Builder?
        </h2>

        <Motion.div {...featuresMotionProps} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            title="ATS Friendly"
            desc="Resumes that pass applicant tracking systems used by companies."
            index={0}
          />
          <FeatureCard
            title="Easy to Use"
            desc="Just fill details, choose a template, and download."
            index={1}
          />
          <FeatureCard
            title="Freshers Focused"
            desc="Perfect formats for students, interns & entry-level jobs."
            index={2}
          />
        </Motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-zinc-900/70 backdrop-blur px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-100">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          <Step number="1" text="Create an account" index={0} />
          <Step number="2" text="Fill your details" index={1} />
          <Step number="3" text="Download your resume" index={2} />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Build Your Resume?
        </h2>
        <p className="text-gray-400 mt-4">
          Create a professional resume and stand out today.
        </p>

        <Link
          to="/signup"
          className="inline-block mt-8 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 px-8 py-4 rounded-xl font-semibold text-white shadow-lg shadow-sky-900/30 transition"
        >
          Start Building Now
        </Link>
      </section>
    </div>
  );
}

/* Feature Card Component */
function FeatureCard({ title, desc, index = 0 }) {
  const reducedMotion = useReducedMotion();

  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.5, delay: index * 0.1 },
        whileHover: { scale: 1.03 },
      };

  return (
    <Motion.div
      {...motionProps}
      className="bg-zinc-900/70 backdrop-blur p-6 rounded-xl transition"
    >
      <h3 className="text-xl font-semibold text-red-500 mb-3">
        {title}
      </h3>
      <p className="text-gray-400">{desc}</p>
    </Motion.div>
  );
}

/* Step Component */
function Step({ number, text, index = 0 }) {
  const reducedMotion = useReducedMotion();

  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.5, delay: index * 0.1 },
      };

  return (
    <Motion.div {...motionProps}>
      <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-red-500 text-xl font-bold mb-4">
        {number}
      </div>
      <p className="text-gray-300">{text}</p>
    </Motion.div>
  );
}

export default Landing;
