import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromId } from '../api';

// const findProduct = productList.find(({ id }) => id === value);
// console.log(findProduct);

export default class Product extends Component {
  state = {
    productId: '',
    product: [],
  };

  componentDidMount() {
    const getId = this.getProductId();
    this.setState({
      productId: getId,
    }, () => this.getApi());
  }

  getApi = async () => {
    const { productId, product } = this.state;
    const result = await getProductsFromId(productId);
    console.log(result);
    this.setState({
      product: result,
    }, () => console.log(product));
  };

  getProductId = () => {
    const { match } = this.props;
    const matchId = match.params.id;
    console.log(matchId);
    return matchId;
  };

  render() {
    const { product } = this.state;
    const { title, thumbnail, id, price } = product;
    return (
      <div>
        <div key={ id } data-testid="product">
          <h3 data-testid="product-detail-name">{title}</h3>
          <img src={ thumbnail } alt={ title } width="200" />
          <p>{price}</p>
        </div>

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
