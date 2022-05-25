import React, { Component } from 'react';
// import { getProductsFromId } from '../api';

class ShoppingCart extends Component {
  state = {
    carrinho: [], // recebe localStorage
  }

  componentDidMount() {
    this.getLocalStorage();
  }

   getLocalStorage = () => {
     const shoppingCart = JSON.parse(localStorage.getItem('Shopping_cart_key'));
     this.setState({
       carrinho: shoppingCart,
     });
   }

   render() {
     const { carrinho } = this.state;
     return (
       <div>
         <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>

       </div>
     );
   }
}

export default ShoppingCart;
