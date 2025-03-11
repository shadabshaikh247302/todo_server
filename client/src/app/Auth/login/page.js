"use client"
import React from 'react'
import { Login } from './Login'

const page = () => {
  return (
    <div  
    style={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',border:'0px solid black',background: "linear-gradient(90deg, #BE3144, #1D1616)"}}
    >
      <Login/>
    </div>
  )
}

export default page