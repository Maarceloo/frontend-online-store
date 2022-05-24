import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div>
        <nav>
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            <button type="button">Carrinho</button>
          </Link>
        </nav>
        <input
          type="text"
        />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}
