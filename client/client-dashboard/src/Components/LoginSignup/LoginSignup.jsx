import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import { assets } from "../../assets/assets";
import axiosInstance from "../../../axiosInstance";
import { useNavigate, Link } from "react-router-dom";

export default function LoginSignup() {
  const [action, setAction] = useState("Sign Up");
  const initialSignUpData = { name: "", email: "", mobile: "", password: "" };
  const [signUpInput, setSignUpInput] = useState(initialSignUpData);
  const [response, setResponse] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  // Reset form when switching Login/Signup
  useEffect(() => {
    setSignUpInput(initialSignUpData);
    setResponse(null);
  }, [action]);

  const handleSignUpData = (e) => {
    const { name, value } = e.target;
    setSignUpInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (action === "Login") {
      console.log("Login feature not implemented yet");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/v1/user/registrationUser", signUpInput);

      if (res.status === 201) {
        setResponse(res.data.message);
        setRegistrationSuccess(true);
      } else {
        setResponse("Your registration failed, please try again");
      }
    } catch (error) {
      setResponse(error.response?.data?.message || "An unexpected error occurred");
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
              value={signUpInput.email}
              onChange={handleSignUpData}
              required
            />
          </div>
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
          <div className="input">
            <img src={assets.password_icon} alt="Password Icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signUpInput.password}
              onChange={handleSignUpData}
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
            {action === "Login" ? "Login" : "Submit"}
          </button>
        </div>
      </form>
      {response && <div className="response"><p>{response}</p></div>}
    </div>
  );
}
