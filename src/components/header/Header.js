import React from "react";

import './Header.css';
import HeaderCartButton from "./HeaderCartButton";
const Header =(props)=>{
    return(
        <>
       <header className="header">
        <h1>Cloud Kitchen</h1>
       <HeaderCartButton onClick={props.onShowCart} numeberOfCartItems={props.numberOfCartItems} />
       </header>
       <div className="main-image">
        <img src="https://img.freepik.com/free-photo/top-view-arrangement-with-salad-boxes-sauce_23-2148247882.jpg?w=900&t=st=1692767250~exp=1692767850~hmac=21aaaa4d1079b480ad27dc282ea0f09105247791f2096693ff6f4d08670a4e84" alt="Foodimg"/>
       </div>
        </>
    )
}

export default Header;

//This component appears to be the page header.
//  It includes the site title "Cloud Kitchen" and a cart button, which is likely used to open the cart modal.
//   The header also contains an image of food.