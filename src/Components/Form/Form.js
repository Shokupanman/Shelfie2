import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: 0,
      img: '',
      edit: false
    }
  }
  componentDidMount() {
    let { id } = this.props.match.params;
    if (id) {
      axios.get(`/api/product/${id}`)
        .then(res => {
          this.setState({ ...res.data, edit: true })
        })
    }
  }
  componentDidUpdate(oldProps) {
    if (this.props.match.path !== oldProps.match.path) {
      this.setState({
        name: '',
        price: 0,
        img: ''
      })
    }
  }

  imageInput(url) {
    var img = new Image();
    img.onload = _ => this.setState({ img: url });
    img.onerror = _ => this.setState({ img: '' });
    img.src = url;
  }

  nameInput(text) {
    if (text.length <= 20) {
      this.setState({ name: text })
    }
  }

  numberInput(val) {
    if (val[0] === '.') {
      val = '0' + val
    }
    if (isNaN(Number(val))) {
      return;
    }
    let chop = val.split('.');
    let dollars = chop[0];
    let cents = chop[1];
    if (dollars[0] === '0') {
      dollars = '0'
    }
    if (val.indexOf('.') !== -1) {
      dollars += '.'
    }
    if (cents && cents[1]) {
      cents = cents[0] + cents[1];
      val = dollars + cents;
    } else if (!cents) {
      val = dollars;
    }
    if (Number(val) * 100 >= 2147483647) {
      return;
    }
    this.setState({ price: val })
  }

  numberSubmit(num) {
    num ? num = Number(num) : num = 0
    return Math.round(num * 100)
  }

  handleSubmit() {
    let { name, price, img } = this.state;
    if (name) {
      let product = {
        name,
        price: this.numberSubmit(price),
        img
      }
      axios.post('/api/product', product)
        .then(res => {
          this.props.history.push('/');
        })
        .catch(err => console.log('axios create error', err))
    } else {
      console.log('you are missing a name and need to handle this user fail');
    }
  }

  handleEdit() {
    let { id, name, price, img } = this.state;
    if (name) {
      let product = {
        name,
        price: this.numberSubmit(price),
        img
      }
      axios.put(`/api/product/${id}`, product)
        .then(res => {
          this.props.history.push('/');
        })
        .catch(err => console.log('axios update erro', err))
    } else {
      console.log('you are missing a name and need to handle this user fail');
    }
  }

  clearInputs() {
    if (this.props.match.params.id) {
      this.props.history.push('/');
    } else {
      this.setState({
        name: '',
        price: 0,
        img: '',
        edit: false
      })
    }
  }

  render() {
    return (
      <div className='Form'>
        {this.state.img
          ? <div className='form_img_preview' style={{ backgroundImage: `url('${this.state.img}')` }}></div>
        <p>Image URL:</p>
        <input type='text' value={this.state.img} onChange={e => this.imageInput(e.target.value)} />
        <p>Product Name:</p>
        <input type='text' value={this.state.name} onChange={e => this.nameInput(e.target.value)} />
        <p>Price:</p>
        <input type='text' pattern="[0-9]*" value={this.state.price} onChange={e => this.numberInput(e.target.value)} />
        <div className='form_button_box'>
          <button onClick={_ => this.clearInputs()}>Cancel</button>
          {this.state.edit
            ? <button onClick={_ => this.handleEdit()}>Save Changes</button>
            : <button onClick={_ => this.handleSubmit()}>Add to Inventory</button>
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Form);