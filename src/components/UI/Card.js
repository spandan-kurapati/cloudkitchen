import React from "react";
import './Card.css'
const Card = (props) => {
  return <div className="card">{props.children}</div>;
};

export default Card;
// This component represents a generic card element, which can be used to wrap other content.
//  It applies a CSS class for styling.