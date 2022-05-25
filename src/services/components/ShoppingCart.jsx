import React, { Component } from 'react';
import { getProductsFromId } from '../api';

class ShoppingCart extends Component {
  state = {
    carrinho: [],
    produtos: [],
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  getApi = () => {
    const { carrinho } = this.state;
    carrinho.map(async (element) => {
      const product = await getProductsFromId(element);
      this.setState((prevState) => ({ produtos: [...prevState.produtos, product] }));
    });
  }

   getLocalStorage = () => {
     const shoppingCart = JSON.parse(localStorage.getItem('Shopping_cart_key'));
     this.setState({
       carrinho: shoppingCart,
     }, () => this.getApi());
   }

   render() {
     const { carrinho, produtos } = this.state;
     return (
       <div>
         {carrinho.length === 0 ? (
           <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
         ) : (
           produtos.map(({ title, id, thumbnail, price }) => (

             (
               <div
                 key={ id }
               >
                 <h3 data-testid="shopping-cart-product-name">{title}</h3>
                 <img src={ thumbnail } alt={ title } width="200" />
                 <p>{price}</p>
                 <p data-testid="shopping-cart-product-quantity">quantity</p>
               </div>
             )
           ))

         ) }

       </div>
     );
   }
}

export default ShoppingCart;
