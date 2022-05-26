import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    carrinho: [],
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
    console.log(carrinho);
    return (
      <div>
        {!carrinho ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (
          carrinho.map((item) => (
            <div key={ item.id }>
              <h3 data-testid="shopping-cart-product-name">{item.title}</h3>
              <p>{item.price}</p>
              <p
                data-testid="shopping-cart-product-quantity"
              >
                {`quantidade: ${item.qtt}`}
              </p>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default ShoppingCart;
