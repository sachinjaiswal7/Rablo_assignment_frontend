import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Register = ({registerHandler,navigate}) => {
    //useEffect to check if the user has already logged in or not 
    useEffect(() => {
        if(Cookies.get("token")){
           window.location.href = "/";
        }
    })
  return (
    <div className="register-upper">
      <form onSubmit={(e) => (registerHandler(e,navigate))} className="register">
        <div>Product Assignment Register</div>
        <input type='text' placeholder='Name...' required/>
        <input type="text" placeholder="Email..."  required/>
        <input type="password" placeholder="Password..." required />
        <button type="submit">Register</button>
        <div>
          <p>
            Already have an account ?<Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
