import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const AddProduct = ({
  navigate,
  addProductToDataBase,
  setIncrement,
  increment,
}) => {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (!Cookies.get("token")) {
      window.location.href = "/login";
    }
  });
  return (
    <div className="add-product">
      <div>
        <div>Add Product Page</div>
        <input
          type="text"
          placeholder="ProductId..."
          value={productId}
          onChange={(e) => {
            setProductId(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Name of the Product..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Company Name..."
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Price..."
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Rating (0-5)"
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
          }}
        />
        <div className="featured">
          <div>Featured</div>
          <label className="switch" htmlFor="check">
            <input
              type="checkbox"
              id="check"
              checked={check ? 1 : 0}
              onChange={() => {
                setCheck(!check);
              }}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="product-button">
          <button
            onClick={() => {
              addProductToDataBase(
                productId,
                name,
                companyName,
                price,
                rating,
                check,
                setProductId,
                setCompanyName,
                setName,
                setPrice,
                setRating,
                setCheck
              );
              setIncrement(increment+1);
            }}
          >
            Add Product
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Go to Product List
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
