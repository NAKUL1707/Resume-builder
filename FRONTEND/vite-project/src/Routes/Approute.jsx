import Signupcard from "../Components/Signupcard"
import Logincard from "../Components/Logincard"
import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "../pages/home"
import ResumeBuilder from "../pages/ResumeBuilder"
import Layout from "../layout/layout"
function Approute() {
  return (
    <>
        <Routes > 
            <Route element = {<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/builder" element={<ResumeBuilder />} />
          </Route>

            <Route path="/login" element={<Logincard/>}/>
            <Route path="/Signup" element={<Signupcard/>}/>
        </Routes>
    </>
  )
}

export default Approute