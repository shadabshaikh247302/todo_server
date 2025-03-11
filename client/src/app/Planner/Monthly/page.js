"use client"
import dynamic from 'next/dynamic'
import React from 'react'

// import { Main } from '@/app/component/Monthly/Main'
const NOSSR=dynamic(()=>import('@/app/component/Monthly/Main'),{ssr:false})
const page = () => {
  return (
    <div className='p-3' style={{   background: "linear-gradient(90deg, #BE3144, #1D1616)",height:'100%'}}>
    {/* <div style={{margin:'0px',padding:'0px'}}>
        <Navbar/>
    </div> */}
    <NOSSR/>
  </div>
  )
}

export default page