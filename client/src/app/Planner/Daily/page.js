"use client"
import { Navbar } from '../../component/navbar/Navbar'
import dynamic from 'next/dynamic'
import React from 'react'


const SSRDefault = dynamic(() => import('@app/component/Daliy/Main'), {
   ssr: false
})

const Page = () => {
  
  return (
    <div className='p-3' style={{   background: "linear-gradient(90deg, #BE3144, #1D1616)",height:'100vh'}}>
      <SSRDefault />
    </div>
  )
}

export default Page
