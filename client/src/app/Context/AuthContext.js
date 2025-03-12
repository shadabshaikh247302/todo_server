"use client"

import { API } from "@/utils/Utils"
import toast from "react-hot-toast"

const { createContext, useReducer } = require("react")


let inititalState = {}



export const Authcontext = createContext()

async function login(body){
    try {
        const response=await API.post("/auth/logIn",body)

        return response?.data
    } catch (error) {
        toast.error(error?.response?.data||"Network error")
        
    }
}

async function signin(body){
    try {
        const response = await API.post("/auth/Signin",body)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
async function getDataById(id){
    try {
        console.log(id)
        const response = await API.get(`/auth/getDataById/${id}`)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}
function reducer(state,action){
    switch (action.type) {
        case "SIGN_IN":
        const singinState={...action.payload}
        localStorage.setItem('userData',JSON.stringify(singinState))
        return singinState;
        case "LOGIN_IN":
        const loginState={...action.payload}
        localStorage.setItem('userData',JSON.stringify(loginState))
        return loginState;
        default:
            return state;
    }
}

export const Authprovider = ({children})=>{
    const [state, dispatch] = useReducer(reducer,inititalState)
    return(
    <Authcontext.Provider value={{AuthData:state, dispatch, signin: signin, login,getDataById }}> 
        {children}
    </Authcontext.Provider>
    )
}
