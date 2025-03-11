"use client"
import React from 'react'
import { Signin } from './Signin'

const page = () => {
  return (
    <div 
    style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',border:'0px solid black',background: "linear-gradient(90deg, #BE3144, #1D1616)"}}
>
        <Signin/>
    </div>
  )
}

export default page