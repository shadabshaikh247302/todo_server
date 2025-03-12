"use client"
import React, { useContext, useEffect } from 'react'
import { Signin } from './Signin'
import { Authcontext } from '@/app/Context/Authcontext'
import { useRouter } from 'next/navigation'

const page = () => {

  const {AuthData} = useContext(Authcontext)
  const router = useRouter()
  useEffect(()=>{
    if(AuthData.token !==""){
      router.push('/')
      toast.success("You are already logged in!")
    }

  },[AuthData])
  return (
    <div style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',border:'0px solid black',background: "linear-gradient(90deg, #BE3144, #1D1616)"}}>
        <Signin/>
    </div>
  )
}

export default page