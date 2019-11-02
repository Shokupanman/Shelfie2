import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Product.css";

function Product(props) {
  let { id, name, price, img } = props.item;
  return (
    <div className="Product">
      <div className="product_img"></div>
      <div className="product_box">
        <p className="product_title">{name}</p>
        <p className="product_price">{price}</p>
      </div>
      <div className="product_button_box">
        <button onCLick={() => props.deleteProduct(id)}>X</button>
        <button ocClick={() => props.history.push(`/edit/${props.item.id}`)}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default withRouter(Product);
