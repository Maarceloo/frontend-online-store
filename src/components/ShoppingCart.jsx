import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ComponetCart from './ComponetCart';

class ShoppingCart extends Component {
  render() {
    return (
      <div>
        <ComponetCart />
        <Link to="/checkout">
          <button data-testid="checkout-products" type="button">Finalizar Compra</button>
        </Link>
      </div>
    );
  }
}

export default ShoppingCart;
