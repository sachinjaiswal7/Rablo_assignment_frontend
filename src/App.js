import { useEffect, useState } from "react";
import {  Route, Routes, useNavigate } from "react-router-dom"
import axios from "axios";
import './App.scss';
import Login from "./Components/Login";
import Register from "./Components/Register";
import AddProduct from "./Components/AddProduct";
import { toast } from "react-hot-toast";
import MainPage from "./Components/MainPage";
import Cookies from "js-cookie";
import validator from "validator";



//function to handle the register of a user
const registerHandler = async (e, navigate) => {
  e.preventDefault();

  // taking all the fields from the form of the register form
  const name = e.target[0].value;
  const email = e.target[1].value;
  const password = e.target[2].value;


  //checking if the password is strong or not 
  if (!validator.isStrongPassword(password)) {
    return toast.error("Password must contain at least (8 characters, 1 UpperCase, 1 LowerCaser, 1 symbol and 1 number) ")
  }

  try {
    //making a request to the backend to register the user 
    const res = await axios.post(process.env.REACT_APP_SERVER_URL + `/user/register`, { name, email, password });

    //showing a success message;
    toast.success(res.data.message);

    //setting the cookies in the browser to know if the user is still logged in or not.
    Cookies.set("token", res.data.token, {
      expires: 2,
      secure: true,
    });

    //redirecting to main page where the actual products are shown.
    navigate("/");
  } catch (err) {

    // handling errors if any occurs.
    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message);
    }
    else {
      console.log(err);
      toast.error("couldn't complete the registeration try again later");
    }
  }
}


//function to handle the logout of the user 
const logoutHandler = (navigate) => {
  Cookies.remove("token");
  navigate("/login");
  toast.success("Logout successful");
}


//function to handle the login of the user
const loginHandler = async (e, navigate) => {
  // stoping the form from doing its default working.
  e.preventDefault();

  // taking the required field form the form
  const email = e.target[0].value;
  const password = e.target[1].value;

  //checking if the password is strong or not 
  if (!validator.isStrongPassword(password)) {
    return toast.error("Password must contain at least (8 characters, 1 UpperCase, 1 LowerCaser, 1 symbol and 1 number) ")
  }

  try {
    // making request to the backend to login to the user.
    const res = await axios.post(process.env.REACT_APP_SERVER_URL + `/user/login`, { email, password });


    //showing a success message;
    toast.success(res.data.message);

    //setting the cookies in the browser to know if the user is still logged in or not.
    Cookies.set("token", res.data.token, {
      expires: 2,
      secure: true,
    });

    // navigating to main page 
    navigate("/");
  } catch (err) {
    // handling errors if any occurs.
    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message);
    }
    else {
      console.log(err);
      toast.error("couldn't complete the login try again later");
    }
  }

}


//function to handle the adding of the product to the backend
const addProductToDataBase = async (productId, productName, company, price, rating,featured,setProductId,setCompanyName,setName, setPrice,setRating,setCheck) => {
  //all the below checks are validators 
  if (!productId) { return toast.error("Please provide the productId"); }
  if (!productName) {
    return toast.error("Please provide the productName");
  }
  if (!company) {
    return toast.error("Please provide the company Name");
  }
  if (!price || !validator.isNumeric(price) || price <= 0) {
    return toast.error("Price should be a positive number");
  }
  if (!rating || (!validator.isNumeric(rating) && !validator.isDecimal(rating)) || rating < 0 || rating > 5) {
    return toast.error("Rating should be between 0 - 5");
  }

  try {
    //sending the request to the backend to the product in the database.
    const res = await axios.post(process.env.REACT_APP_SERVER_URL + `/product/add`, { productId, name: productName, company, price, rating, createdAt: Date.now(),featured }, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    })
    toast.success(res.data.message);
    setProductId("");
    setName("");
    setCompanyName("");
    setPrice("");
    setRating("");
    setCheck(false);
  }
  catch (err) {
    // handling errors if any occurs.
    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message);
    }
    else {
      console.log(err);
      toast.error("There was some error but it may be possible that the product has been added");
    }
  }
}




function App() {
  const navigate = useNavigate();
  const [increment,setIncrement] = useState(0);
  

 


  return (

    <Routes>
      <Route path="/" element={<MainPage increment={increment}  navigate={navigate} logoutHandler={logoutHandler} />} />
      <Route path="/login" element={<Login loginHandler={loginHandler} navigate={navigate} />} />
      <Route path="/register" element={<Register registerHandler={registerHandler} navigate={navigate} />} />
      <Route path="/addProduct" element={<AddProduct setIncrement={setIncrement} increment={increment} addProductToDataBase={addProductToDataBase} navigate={navigate} />} />
    </Routes>

  );
}

export default App;
