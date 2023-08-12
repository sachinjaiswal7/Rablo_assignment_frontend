import React, { useEffect ,useState} from "react";
import Product from "./Product";
import Cookies from "js-cookie";
import axios from "axios";
import {toast} from "react-hot-toast";

const MainPage = ({ navigate, logoutHandler ,increment,bringAnimation,disappearAnimation}) => {
  const [products,setProducts] = useState([]);
  useEffect(() => {
    if (!Cookies.get("token")) {
      window.location.href = "/login";
    }
    
  });


  useEffect(() => {
    const fetchProduct = async() => {
      bringAnimation();
      try{
      const res = await axios.get(process.env.REACT_APP_SERVER_URL+`/product/all`,{
        headers : {
          Authorization : `Bearer ${Cookies.get("token")}`
        }
      })
      setProducts(res.data.products);
    }catch(err){
      toast.error("Couldn't fetch the products due to internal error");
    }
    disappearAnimation();
    }
    fetchProduct();
  
  },[increment,bringAnimation,disappearAnimation])

  return (
    <div className="main-page">
      <div className="product-header">
        <button
          onClick={() => {
            navigate("/addProduct");
          }}
        >
          Add Product
        </button>
        <button
          onClick={() => {
            logoutHandler(navigate);
          }}
        >
          Logout
        </button>
      </div>
      {(!products || products.length === 0) ? (
        <div style={{textAlign:"center",fontSize:40}}>No products to Show</div>
      ) : (
        products.map((item, index) => {
          return (
            <Product
              key={item.productId}
              productId={item.productId}
              name={item.name}
              company={item.company}
              price={item.price}
              featured={item.featured}
              rating={item.rating.$numberDecimal}
              createdAt={item.createdAt}
              number={index+1}
            />
          );
        })
      )}
    </div>
  );
};

export default MainPage;
