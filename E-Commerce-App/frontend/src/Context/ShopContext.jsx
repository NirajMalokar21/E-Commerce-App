import React, { createContext, useEffect, useState } from 'react'


export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for(let index=0; index < 300+1; index++) {
        cart[index] = 0
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart())
    const [all_product, setAll_Product] = useState([]);

    useEffect(() => {
        fetch('https://e-commerce-app-3k8g.onrender.com/allproducts')
        .then((response) => response.json())
        .then((data) => setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch('https://e-commerce-app-3k8g.onrender.com/getcart', {
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-type':'application/json'
                },
                body:""
            })
            .then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    }, [])

    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        
        if(localStorage.getItem('auth-token')){
            fetch('https://e-commerce-app-3k8g.onrender.com/addtocart', {
                method: 'POST',
                headers: {
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-type':'application/json'
                },
                body: JSON.stringify({
                    "itemID":itemId,
                })
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
            .catch((error) => console.error('Error:', error));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('https://e-commerce-app-3k8g.onrender.com/removefromcart', {
                method: 'POST',
                headers: {
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-type':'application/json'
                },
                body: JSON.stringify({
                    "itemID":itemId,
                })
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((p)=> p.id===Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product,cartItems,addToCart,removeFromCart}

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;