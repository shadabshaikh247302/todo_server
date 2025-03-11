"use client"
import Image from "next/image";
import styles from "./page.module.css";

// import { Main } from "./component/Home/Main";
// import { useState } from "react";
// import { Authmain } from "./Auth/Main/Authmain";
// import { Login } from "./Auth/login/Login";
import { Main_component } from "./component/Home/Main_component";
import { Navbar } from "./component/navbar/Navbar";



export default function Hello(){

  return(
    <div >
      
      <Main_component/>
    </div>  
  );
}

