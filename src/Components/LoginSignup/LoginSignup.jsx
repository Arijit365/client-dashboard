import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import { assets } from "../../assets/assets";
import axiosInstance from "../../../axiosInstance";
import { useNavigate  , Link} from "react-router-dom";

export default function LoginSignup() {
  const [action, setAction] = useState("Login");
  const initialSignUpData = { name: "", email: "", mobile: "", password: "" };
  const [signUpInput, setSignUpInput] = useState(initialSignUpData);
  const [response, setResponse] = useState(null); 
  const[registrationSuccess,setRegistrationSuccess] = useState(false) // react-router-dom to navigate the page on specific url
  const navigate = useNavigate();

  const handleSignUpData = (e) => {
    const { name, value } = e.target;
    setSignUpInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signUpInput);
    try {
      const res = await axiosInstance.post("/api/v1/user/registrationUser", signUpInput);

  if(res.status === 201 ){ // take the input from API response'
    setResponse(res.data.message);
    setRegistrationSuccess(true)
  }else{
    setResponse("Your registration failed, please try again")
  }
    
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){   
        setResponse(error.response.data.message);
      }
      else{
        setResponse("An unexpected error is happens")
      }
    }
  };

  useEffect(()=>{
    if(registrationSuccess){
      console.log("registration page navigate successfully")
      navigate("/success")
    }
  }, [registrationSuccess,navigate])

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {action === "Login" ? null : (
            <div className="input">
              <img src={assets.user_icon} alt="" />
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={signUpInput.name}
                onChange={handleSignUpData}
              />
            </div>
          )}
          <div className="input">
            <img src={assets.email_icon} alt="" />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={signUpInput.email}
              onChange={handleSignUpData}
            />
          </div>
          <div className="input">
            <img src={assets.phone_number_icon} alt="" />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={signUpInput.mobile}
              onChange={handleSignUpData}
            />
          </div>
          <div className="input">
            <img src={assets.password_icon} alt="" />
            <input
              type="password" // Use secure type for passwords
              name="password"
              placeholder="Password"
              value={signUpInput.password}
              onChange={handleSignUpData}
            />
          </div>
        </div>
        {action === "Sign Up" ? null : (
          <div className="forget-password">
            Didn't remember password <Link to="/forgot-password" className="forgot-link"> Click here  </Link>
          </div>
        )}
        <div className="submit-form">
          <button
            type="button"
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => setAction("Sign Up")}
          >
            Sign Up
          </button>
          <button
            type="button"
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => setAction("Login")}
          >
            Login
          </button>
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      
      </form>
      {response && <div className="response"><p>{response}</p></div>}
    </div>
  );
}
