import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TesteCarrinho from './TesteCarrinho';

class ShoppingCart extends Component {
  render() {
    return (
      <div>
        <TesteCarrinho />
        <Link to="/checkout">
          <button data-testid="checkout-products" type="button">Finalizar Compra</button>
        </Link>
      </div>
    );
  }
}

export default ShoppingCart;
