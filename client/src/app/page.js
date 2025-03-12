"use client"
import Image from "next/image";
import styles from "./page.module.css";

import { Main_component } from "./component/Home/Main_component";
import { Navbar } from "./component/navbar/Navbar";
import { useContext } from "react";
import { Authcontext } from "./Context/Authcontext";
import { Login } from "./Auth/login/Login";
import { useRouter } from "next/navigation";



export default function Hello(){
  const {AuthData} = useContext(Authcontext)
  const router = useRouter()
  return(

    <div >
      {
        AuthData.token === ''?
          router.push("/Auth/login"):<Main_component/>
        
      }
      
    </div>  
  );
}

