import React from 'react'

const Product = ({productId, name, company, price, featured,rating,createdAt,number}) => {
  return (
    <div className='product'>
        <div className='image '><div>{number}</div></div>
      
        <div>
        <div><b>ProductId</b> : {productId}</div>
        <div><b>Name</b> : {name}</div>
        <div><b>Company</b> : {company}</div>
        <div><b>Price</b> : {price}</div>
        <div><b>Featured</b> : {(featured) ? "YES" : "NO"}</div>
        <div><b>Rating</b> : {rating}</div>
        <div><b>CreatedAt</b> : {createdAt}</div>
        </div>
    </div>
  )
}

export default Product