import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  }, [])

  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        id:id,
      })
    })
    fetchInfo();
  }

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {allProducts.map((p,i)=>{
          return (
            <>
              <div key={i} className='listproduct-format-main listproduct-format'>
                <img className='listproduct-product-icon' src={p.image} alt="" />
                <p>{p.name}</p>
                <p>${p.old_price}</p>
                <p>${p.new_price}</p>
                <p>{p.category}</p>
                <img className='listproduct-remove-icon' src={cross_icon} alt='' onClick={()=>{removeProduct(p.id)}} />
              </div>
              <hr />
            </>
          )
        })}
      </div>
    </div>
  )
}

export default ListProduct