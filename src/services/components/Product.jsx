import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromId } from '../api';

export default class Product extends Component {
  state = {
    productId: '',
    objeto: '',
  };

  componentDidMount() {
    const getId = this.getProductId();
    this.setState({
      productId: getId,
    }, () => this.getApi());
  }

  getApi = async () => {
    const { productId } = this.state;
    const produto = await getProductsFromId(productId);
    this.setState({
      objeto: produto,
    });
  };

  getProductId = () => {
    const { match } = this.props;
    const matchId = match.params.id;
    return matchId;
  };

  addToCart = (produto) => {
    const carrinho = JSON.parse(localStorage.getItem('Shopping_cart_key'));
    if (!carrinho) {
      produto.qtt = 1;
      return localStorage.setItem('Shopping_cart_key', JSON.stringify([produto]));
    }
    if (carrinho.some((item) => produto.id === item.id)) {
      const index = carrinho.findIndex((items) => produto.id === items.id);
      carrinho[index].qtt += 1;
      return localStorage.setItem('Shopping_cart_key', JSON.stringify([...carrinho]));
    }
    if (carrinho.length > 0) {
      produto.qtt = 1;
      return localStorage.setItem('Shopping_cart_key',
        JSON.stringify([...carrinho, produto]));
    }
  };

  render() {
    const { objeto } = this.state;
    const { title, thumbnail, id, price } = objeto;
    return (
      <div key={ id } data-testid="product">
        <h3 data-testid="product-detail-name">{title}</h3>
        <img src={ thumbnail } alt={ title } width="200" />
        <p>{price}</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addToCart(objeto) }
        >
          Adicionar ao carrinho
        </button>
        <nav>
          <Link to="/shopping-cart">
            <button data-testid="shopping-cart-button" type="button">Carrinho</button>
          </Link>
        </nav>
      </div>
    );
  }
}
Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
