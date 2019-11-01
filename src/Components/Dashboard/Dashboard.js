import React, { Component } from "react";
import Product from "./../Product/Product";
import App from "./../../App";
import axios from "axios";

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      imgUrl: "",
      productName: "",
      price: 0,
      newName: "",
      newImg: "",
      newPrice: 0
    };
  }

  resetState() {
    this.state = this.defaultState;
  }

  addImage() {
    this.setState({
      imgUrl: ""
    });
  }

  addPName() {
    this.setState({
      productName: ""
    });
  }

  addPrice() {
    this.setState({
      price: ""
    });
  }
  getInventory() {
    axios
      .get("/api/inventory")
      .then(res => this.setState({ inventory: res.data }));
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    let { imgUrl, productName, price, resetState } = this.state;
    let { handleChange } = this;
    return (
      <div>
        <div className="Dashboard">
          <div className="addInventory">
            <input
              type="text"
              name="empty"
              value={this.state.newImg}
              onChange={handleChange}
            />
            <input
              type="text"
              value={this.state.newName}
              onChange={handleChange}
            />
            <input
              type="text"
              value={this.state.newPrice}
              onChange={handleChange}
            />
            <button onClick={resetState}>Cancel</button>
            <button>Add to Inventory</button>
          </div>
        </div>
        <Product />
      </div>
    );
  }
}
