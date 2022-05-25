import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
  getProductsFromCategory,
} from '../api';

export default class Home extends Component {
  state = {
    categorieList: [],
    inputName: '',
    productList: [],
    notFound: '',
    filterCategory: [],
    carrinho: [],
  };

  componentDidMount() {
    this.getCategoriesApi();
  }

  getCategoriesApi = async () => {
    const api = await getCategories();
    this.setState({
      categorieList: [...api],
    });
  };

  handleRadio = async ({ target: { value } }) => {
    console.log(value);
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
    const { carrinho } = this.state;
    // fazer todas as validações do carrinho , (some) se produto === carrinho
    produto.qtt = 1;
    this.setState((prevState) => ({ carrinho: [...prevState.carrinho, produto] }),
      () => localStorage.setItem('Shopping_cart_key', JSON.stringify(carrinho)));
  }

  render() {
    const {
      categorieList,
      inputName,
      productList,
      notFound,
      filterCategory } = this.state;
    return (
      <div>

        <nav>
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            <button type="button">Carrinho</button>
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
              <Link to={ `/product/${item.id}` } data-testid="product-detail-link">
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
          filterCategory.map(({ title, price, thumbnail, id }) => (
            <div key={ title } data-testid="product">
              <h3>{title}</h3>
              <img src={ thumbnail } alt={ title } width="200" />
              <p>{price}</p>
              <Link to={ `/product/${id}` } data-testid="product-detail-link">
                Detalhes
              </Link>
              <br />
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ this.addToCart }
                value={ id }
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
