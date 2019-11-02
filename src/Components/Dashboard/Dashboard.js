import React, { Component } from "react";
import Product from "./../Product/Product";
import axios from "axios";
import "./Dashboard.css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: []
    };
    this.getInventory = this.getInventory.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }
  componentDidMount() {
    this.getInventory();
  }
  getInventory() {
    axios
      .get("/api/inventory")
      .then(res => this.SVGElementInstanceList({ inventory: res.data }));
  }
  deleteProduct(id) {
    axios
      .delete(`/api/product/${id}`)
      .then(res => this.getInventory())
      .catch(err => console.log(`Uh oh, somebody made a ${err}! `));
  }
  render() {
    return (
      <div className="Dashboard">
        {this.state.inventory.map(el => {
          return (
            <Product key={el.id} item={el} deleteProduct={this.deleteProduct} />
          );
        })}
      </div>
    );
  }
}
