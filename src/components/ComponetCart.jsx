import React, { Component } from 'react';

class ComponetCart extends Component {
  state = {
    carrinho: [],
  };

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const shoppingCart = JSON.parse(localStorage.getItem('Shopping_cart_key'));
    this.setState({
      carrinho: shoppingCart,
    });
  };

  somaQtt = (index) => {
    const item = JSON.parse(localStorage.getItem('Shopping_cart_key'));

    if (item[index].qtt < item[index].available_quantity) {
      item[index].qtt += 1;
    }
    localStorage.setItem('Shopping_cart_key', JSON.stringify(item));
    this.getLocalStorage();
  };

  subQtt = (index) => {
    const item = JSON.parse(localStorage.getItem('Shopping_cart_key'));
    if (item[index].qtt === 1) {
      return localStorage.removeItem('Shopping_cart_key', JSON.stringify(item));
    }
    item[index].qtt -= 1;
    localStorage.setItem('Shopping_cart_key', JSON.stringify(item));
    this.getLocalStorage();
  };

  render() {
    const { carrinho } = this.state;
    if (!carrinho) {
      return (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      );
    }
    return (
      <div>
        {carrinho.map((item, index) => (
          <div key={ item.id }>
            <h3 data-testid="shopping-cart-product-name">{item.title}</h3>
            <button
              type="button"
              data-testid="product-increase-quantity"
              onClick={ () => this.somaQtt(index) }
            >
              +
            </button>
            <p data-testid="shopping-cart-product-quantity">
              {`quantidade: ${item.qtt}`}
            </p>
            <button
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ () => this.subQtt(index) }
            >
              -
            </button>
            <p>
              {item.price.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default ComponetCart;
