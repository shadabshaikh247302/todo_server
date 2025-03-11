"use client"
import { Navbar } from '@/app/component/navbar/Navbar'
import dynamic from 'next/dynamic'
import React from 'react'


const SSRDefault = dynamic(() => import('@/app/component/Daliy/Main'), {

   ssr: false})

const Page = () => {
  return (
    <div className='p-3' style={{   background: "linear-gradient(90deg, #BE3144, #1D1616)",height:'100vh'}}>
      {/* <div style={{margin:'0px',padding:'0px'}}>
          <Navbar/>
      </div> */}
      <SSRDefault />
    </div>
  )
}

export default Page
