"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { BlurCircular } from "@mui/icons-material";
import { Authcontext } from "@/app/Context/AuthContext";

export const Navbar = () => {
  const [authModel, setAuthModel] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [data,setData]=useState()
  function logoutHandler(){
    alert("asdf")
    localStorage.removeItem("userData")
    router.push('/')
  }
  const {getDataById} = useContext(Authcontext)
  // const token = JSON.parse(localStorage.getItem("userData"))

  return (
    <nav
      className="navbar navbar-expand-lg shadow"
      style={{ background: "linear-gradient(90deg, #BE3144, #1D1616)" }}
    >
      <div className="container">
        {/* Logo */}
        <img
            onClick={() => setAuthModel((prev) => !prev)}
            className="rounded-circle border border-light"
            src="`${data/profilePicture}`"
            alt="Profile"
            width="50"
            height="50"
            style={{ cursor: "pointer" }}
          />

        {/* Navbar Toggler */}
       

        {/* Mobile Menu with Animation & Background Color */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-100 position-absolute top-100 start-0 end-0"
              style={{  backdropFilter: "blur(10px)",borderRadius:'0px 0px 20px 20px',boxShadow:"-1px 8px 8px rgba(0, 0, 0, 0.48) " , color: "white" }}
            >
            <ul className=" navbar-nav text-center" >
  <li className="nav-item">
    <Link className="nav-link text-light" href="/">
      Home
    </Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link text-light" href="#">
      About
    </Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link text-light" href="#">
      Services
    </Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link text-light" href="#">
      Contact
    </Link>
  </li>
</ul>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Menu */}
        <div className="collapse navbar-collapse d-none d-lg-block">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" href="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" href="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" href="/contact">
                Contact
              </Link>
            </li>
            
          </ul>
        </div>

        

        {/* Profile Dropdown with Background Color */}
        <div className="position-relative">
        
          <AnimatePresence>
            {authModel && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="dropdown-menu show mt-2 p-2 shadow position-absolute"
                style={{ right: 0, background: "#BE3144", color: "white" }}
              >
                <button
                  className="dropdown-item text-light"
                  style={{ background: "transparent" }}
                  onClick={() => router.push("/Auth/login")}
                >
                  Login
                </button>
                <button
                  className="dropdown-item text-light"
                  style={{ background: "transparent" }}
                  onClick={() => router.push("/Auth/Signin")}
                >
                  Sign In
                </button>
                <button
                  className="dropdown-item text-light"
                  style={{ background: "transparent" }}
                  onClick={() => logoutHandler()}
                >
                  Logout
                </button>
              </motion.div>
            )}
             <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? (
            <FaTimes className="text-light" size={24} />
          ) : (
            <FaBars className="text-light" size={24} />
          )}
        </button>
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};
