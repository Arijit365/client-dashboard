import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import { assets } from "../../assets/assets";
import axiosInstance from "../../../axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { preconnect } from "react-dom";

export default function LoginSignup() {
  const [action, setAction] = useState("Sign Up");
  const initialSignUpData = { name: "", email: "", mobile: "", password: "" }; // object for sign up
  const [signUpInput, setSignUpInput] = useState(initialSignUpData); // pass the SignUpData object into useState 
  const [response, setResponse] = useState({message:"null",type:""}); 
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const initialLoginData = {email:"",password:""} 
  const [loginInput , setLoginInput] = useState(initialLoginData); // object of login details in state 
  const navigate = useNavigate();

  // Reset form when switching Login/Signup
  useEffect(() => {
    setSignUpInput(initialSignUpData);
    setLoginInput(initialLoginData)
    setResponse({message:"null",type:""});
  }, [action]);

 // Handle the data for sign up
  const handleSignUpData = (e) => {
    const { name, value } = e.target;
    setSignUpInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle data for login
  const handleLoginData = (e) =>{
     const {name,value} = e.target;
     setLoginInput((prevState) =>({
   ...prevState,
   [name]:value
     }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // If the action is Sign Up
      if(action === "Sign Up"){
      const res = await axiosInstance.post("/api/v1/user/registrationUser", signUpInput);

      // If the API sends success 
      if (res.status === 201) {
        setResponse({message:res.data.message,type:"success"});
        setRegistrationSuccess(true);
      } else {
        setResponse({message:"Your registration failed, please try again",type:"error"});
      }
    }
    // If the action is Login 
    if(action === "Login"){
       const login_api_response = await axiosInstance.post("/api/v1/user/login-user", loginInput);
 // If the API gives successfull response 
 if(login_api_response.status === 201 ){
  setResponse({message:login_api_response.data.message,type:"success"});
  navigate('/main-dashboard'); // After succesfull Login page rediect to main dashboard 
 }else{
  setResponse({message:"Your registration failed, please try again",type:"error"});
}
    }
    } catch (error) {
      setResponse({
        message:error.response?.data?.message || "An unexpected error occured",
        type:"error"
      });
    }
  };

  useEffect(() => {
    if (registrationSuccess) {
      navigate("/success");
    }
  }, [registrationSuccess, navigate]);

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {action === "Sign Up" && (
            <div className="input">
              <img src={assets.user_icon} alt="User Icon" />
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={signUpInput.name}
                onChange={handleSignUpData}
                required
              />
            </div>
          )}
          <div className="input">
            <img src={assets.email_icon} alt="Email Icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={action === "Login" ? loginInput.email : signUpInput.email }
              onChange={action === "Login" ? handleLoginData : handleSignUpData}
              required
            />
          </div>
          {action === "Sign Up" && (
            <div className="input">
              <img src={assets.phone_number_icon} alt="Phone Icon" />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={signUpInput.mobile}
                onChange={handleSignUpData}
                required
              />
            </div>
          )}
          <div className="input">
            <img src={assets.password_icon} alt="Password Icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={action === "Login" ? loginInput.password : signUpInput.password }
              onChange={action === "Login" ? handleLoginData : handleSignUpData}
              required
            />
          </div>
        </div>

        {action === "Login" && (
           <div className="forget-password">
           Didn't remember password?
         <Link to="/forgot-password" onClick={()=>console.log("It is clicked")}> 
         Click Here!
         </Link>
         </div>
        )}

        <div className="submit-form">
          <button
            type="button"
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => setAction("Login")}
          >
            Login
          </button>
          <button
            type="button"
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => setAction("Sign Up")}
          >
            Sign Up
          </button>
          <button type="submit" className="submit">
            {action === "Login" ? "Login" : "submit"}
          </button>
        </div>
      </form>
   {
    response.message &&(
      <div className={response.type === "error"? "response.error" : "response-success"}>
<p>{response.message}</p>
        </div>
    )
   }
    </div>
  );
}
