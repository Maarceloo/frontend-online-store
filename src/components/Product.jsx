import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromId } from '../services/api';

export default class Product extends Component {
  state = {
    productId: '',
    objeto: '',
    email: '',
    rate: '',
    descricao: '',
    coments: [],
    quantidade: 0,
  };

  componentDidMount = () => {
    this.QuantityCart();
    this.getLocalStorage();
    const getId = this.getProductId();
    this.setState({
      productId: getId,
    }, () => this.getApi());
  }

  QuantityCart = () => {
    const shoppingCart = JSON.parse(localStorage.getItem('Shopping_cart_key'));
    const ten = 10;
    if (shoppingCart) {
      let result = 0;
      shoppingCart.map((number) => {
        result += parseInt(number.qtt, ten);
        return result;
      });
      console.log(result);
      this.setState({
        quantidade: result,
      });
    }
  }

  getLocalStorage = () => {
    const comentarios = JSON.parse(localStorage.getItem('Coment_key'));
    this.setState({
      coments: comentarios,
    });
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
    if (carrinho) {
      if (carrinho.some((item) => produto.id === item.id)) {
        const index = carrinho.findIndex((items) => produto.id === items.id);
        carrinho[index].qtt += 1;
        localStorage.setItem('Shopping_cart_key', JSON.stringify([...carrinho]));
        return this.QuantityCart();
      }
      produto.qtt = 1;
      localStorage.setItem('Shopping_cart_key',
        JSON.stringify([...carrinho, produto]));
      return this.QuantityCart();
    }
    if (!carrinho) {
      produto.qtt = 1;
      localStorage.setItem('Shopping_cart_key', JSON.stringify([produto]));
      return this.QuantityCart();
    }
  };

  saveLocalStorage = (obj) => {
    const getObj = JSON.parse(localStorage.getItem('Coment_key'));
    if (!getObj) {
      return localStorage.setItem('Coment_key', JSON.stringify([obj]));
    }
    if (getObj.length > 0) {
      return localStorage.setItem('Coment_key', JSON.stringify([...getObj, obj]));
    }
    // this.setState((prevState) => ({ ...prevState, email: '', descricao: '', rate: '' }));
  }

  handleClick = () => {
    const { email, descricao, rate } = this.state;
    const comentario = { email1: email, descri: descricao, radio: rate };
    this.saveLocalStorage(comentario);
    this.setState({
      email: '',
      descricao: '',
      rate: '',
    }, () => this.getLocalStorage());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }));
  };

  render() {
    const { objeto, email, descricao, coments, quantidade } = this.state;
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
            <button data-testid="shopping-cart-button" type="button">
              Carrinho
              <p data-testid="shopping-cart-size">{ quantidade }</p>
            </button>
          </Link>
        </nav>
        <div>
          <form>
            <label htmlFor="email">
              Email
              <input
                data-testid="product-detail-email"
                placeholder="email"
                name="email"
                type="text"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <div id="nota">
              <label htmlFor="rate" id="label-rate">
                {' '}
                Como você avalia o produto?
              </label>
              <input
                type="radio"
                name="rate"
                value="1"
                id="escolha"
                data-testid="1-rating"
                onChange={ this.handleChange }
              />
              1
              <input
                type="radio"
                name="rate"
                value="2"
                id="escolha"
                data-testid="2-rating"
                onChange={ this.handleChange }
              />
              2
              <input
                type="radio"
                name="rate"
                value="3"
                id="escolha"
                data-testid="3-rating"
                onChange={ this.handleChange }
              />
              3
              <input
                type="radio"
                name="rate"
                value="4"
                data-testid="4-rating"
                id="escolha"
                onChange={ this.handleChange }
              />
              4
              <input
                type="radio"
                name="rate"
                value="5"
                data-testid="5-rating"
                id="escolha"
                onChange={ this.handleChange }
              />
              5
            </div>
            <label htmlFor="descricao">
              Comentario
              <textarea
                data-testid="product-detail-evaluation"
                name="descricao"
                value={ descricao }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="submit-review-btn"
              type="button"
              name="botao"
              onClick={ this.handleClick }
            >
              Salvar
            </button>
          </form>
        </div>
        {!coments ? (null) : coments.map((item) => (
          <div key={ item.email1 }>
            <br />
            <p>{item.email1}</p>
            <p>{item.descri}</p>
            <p>{item.radio}</p>
            <br />
          </div>
        ))}
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
