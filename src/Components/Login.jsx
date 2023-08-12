import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Login = ({loginHandler,navigate}) => {
  useEffect(() => {
    if(Cookies.get("token")){
    window.location.href = "/";
    }
  })
  return (
    <div className='login-upper'>
        
    <form onSubmit={(e) => {loginHandler(e,navigate)}} className='login' >
        <div>Product Assignment Login</div>
       
        <input type="email" placeholder='Email...' required/>
        <input type ="password" placeholder ="Password..." required/>
        <button type='submit'>Login</button>
        <div>
            <p>Do not have an account ?<Link to="/register">Register</Link></p>
        </div>
    </form>
    </div>
  )
}

export default Login