import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const Login = ()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");
    const [error,setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate()
    const handleLogin = async (e)=>{
        e.preventDefault();
        if(!validateEmail(email)){
            setError("Please Enter a Valid Email")
            return
        }
        if(!password){
            setError("Please Enter Password")
            return
        }
        setError("");
        setIsLoading(true);
        //login api call
        try {
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            });

            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        }catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
                console.log(error);
            }
        }finally {
            setIsLoading(false); 
        }
    }
    return (
        <>
      <Navbar />
      <div className="flex items-center justify-center mt-28 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md border rounded-2xl bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl text-center mb-7">Log-in</h4>
            <input
              type="text"
              placeholder="Enter Email"
              className="input-box w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary w-full text-center" disabled={isLoading}>
              {isLoading ? (
                  <div className="w-full justify-center flex items-center space-x-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </div>
              ) : (
                "Take to Space"
              )}
            </button>
            <p className="text-sm text-center mt-4">
              Not Registered ?{" "}
              <Link to="/Signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
    )
}

export default Login