import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
  getProductsFromCategory,
} from '../services/api';

export default class Home extends Component {
  state = {
    categorieList: [],
    inputName: '',
    productList: [],
    notFound: '',
    filterCategory: [],
    quantidade: 0,
  };

  componentDidMount() {
    this.getCategoriesApi();

    this.QuantityCart();
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
      this.setState({
        quantidade: result,
      });
    }
  }

  getCategoriesApi = async () => {
    const api = await getCategories();
    this.setState({
      categorieList: [...api],
    });
  };

  handleRadio = async ({ target: { value } }) => {
    const api = await getProductsFromCategory(value);
    const product = api.results;
    this.setState({
      filterCategory: product,
    });
  };

  handleInputClick = async () => {
    const { inputName } = this.state;
    const api = await getProductsFromCategoryAndQuery('', inputName);
    const product = api.results;
    this.setState({
      productList: product,
      notFound: 'Nenhum produto foi encontrado',
    });
  };

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
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

  render() {
    const {
      categorieList,
      inputName,
      productList,
      notFound,
      filterCategory,
      quantidade } = this.state;
    return (
      <div>
        <nav>
          <Link to="/shopping-cart">
            <button
              data-testid="shopping-cart-button"
              type="button"
            >
              Carrinho
              <p data-testid="shopping-cart-size">{ quantidade }</p>
            </button>
          </Link>
        </nav>
        <input
          type="text"
          name="inputName"
          value={ inputName }
          data-testid="query-input"
          onChange={ this.handleOnChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleInputClick }
        >
          Pesquisar
        </button>
        <div onChange={ this.handleRadio }>
          <ul>
            {categorieList.map((categorie) => (
              <label
                data-testid="category"
                key={ categorie.id }
                htmlFor={ categorie.name }
              >
                <br />
                <input
                  onClick={ this.handleClick }
                  value={ categorie.id }
                  name="category"
                  type="radio"
                  id={ categorie.name }
                />
                {categorie.name}
              </label>
            ))}
          </ul>
        </div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        {productList.length > 0 ? (
          productList.map((item) => (
            <div key={ item.id } data-testid="product">
              <h3>{item.title}</h3>
              <img src={ item.thumbnail } alt={ item.title } width="200" />
              <p>{item.price}</p>
              <Link
                to={ `/product/${item.id}` }
                data-testid="product-detail-link"
              >
                Detalhes
              </Link>
              <br />
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => this.addToCart(item) }
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))
        ) : (
          <p>{notFound}</p>
        )}

        {filterCategory.length > 0 ? (
          filterCategory.map((item) => (
            <div key={ item.id } data-testid="product">
              <h3>{item.title}</h3>
              <img src={ item.thumbnail } alt={ item.id } width="200" />
              <p>{item.price}</p>
              {item.shipping.free_shipping
              && <p data-testid="free-shipping">Frete Grátis</p>}

              <Link
                to={ `/product/${item.id}` }
                data-testid="product-detail-link"
              >
                Detalhes
              </Link>
              <br />
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => this.addToCart(item) }
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))
        ) : (
          <p>{notFound}</p>
        )}
      </div>
    );
  }
}
