import Signupcard from "../Components/Signupcard"
import Logincard from "../Components/Logincard"
import React from 'react'
import { Routes, Route } from "react-router-dom"
import Landing from "../Pages/Home"
import ResumeBuilder from "../Pages/ResumeBuilder"
import TemplateSelect from "../Pages/TemplateSelect"
import Layout from "../layout/layout"
function Approute() {
  return (
    <>
        <Routes > 
            <Route element = {<Layout/>}>
            <Route path="/" element={<Landing/>}/>
            <Route path="/templates" element={<TemplateSelect />} />
            <Route path="/builder" element={<ResumeBuilder />} />
          </Route>

            <Route path="/login" element={<Logincard/>}/>
            <Route path="/signup" element={<Signupcard/>}/>
            <Route path="/Signup" element={<Signupcard/>}/>
        </Routes>
    </>
  )
}

export default Approute