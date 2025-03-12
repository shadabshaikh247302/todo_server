import React, { useContext, useState } from "react";
import { Box, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, TextField, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Authcontext } from "../../Context/AuthContext";
import { styled } from "@mui/material/styles";
import toast from "react-hot-toast";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const Login = ({ setmode1, setmode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, dispatch, getDataById } = useContext(Authcontext);
  const router = useRouter();


  const handleSubmit = async () => {
  
    if (formData.email !== "" && formData.password !== "") {
      const data = await login(formData);
      if (data) {
        dispatch({ type: "LOGIN_IN", payload: data });
        router.push("/");
        toast.success("You are successfully login")
      }
    } else {
      toast.error("All fields are required!")
      // alert("Kindly fill the login form");
    }
  };

  const inputStyle = {
    "& label": { color: "white" },
    "& label.Mui-focused": { color: "white" },
    "& .MuiOutlinedInput-root": {
      color: "white",
      borderRadius: "8px",
      "& fieldset": { borderColor: "hsl(var(--border))" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { border: "2px solid white" },
    },
  };

  return (
    <div
      className="shadow"
      style={{
        borderRadius: "10px",
        width: "90%",
        maxWidth: "400px",
        background: "linear-gradient(90deg, rgba(190, 49, 68, 0.47), rgba(29, 22, 22, 0.36))",
        padding: "20px",
        margin: "auto",
        marginTop: "10vh",
      }}
    >
      <h4 className="text-center text-white">Login Form</h4>
      <Box component="form" noValidate autoComplete="off" sx={{ width: "100%" }}>
        <TextField
          sx={inputStyle}
          fullWidth
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          label="Email"
          variant="outlined"
          margin="normal"
        />
        <FormControl fullWidth variant="outlined" margin="normal" sx={inputStyle}>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Box>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "20px" }}
      >
        Login
      </Button>
      <div className="text-center mt-3">
        <button
          onClick={() => router.push("Signin")}
          style={{
            backgroundColor: "transparent",
            fontWeight: "600",
            border: "none",
            fontSize: "12px",
            color: "white",
          }}
        >
          New user?
        </button>
      </div>
    </div>
  );
};