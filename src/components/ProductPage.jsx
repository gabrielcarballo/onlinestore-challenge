import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class ProductPage extends Component {
  state = {
    productInfos: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const apiReturn = await getProductById(id);
    this.setState({ productInfos: apiReturn });
  }

  createProductPage = () => {
    const {
      productInfos,
    } = this.state;

    const {
      id,
      title,
      price,
      thumbnail,
    } = productInfos;
    return (
      <div>
        <div>
          <h1>
            <span data-testid="product-detail-name">{ title }</span>
            <span data-testid="product-detail-price">{ price }</span>
          </h1>
        </div>
        <div>
          <img
            src={ thumbnail }
            alt={ title }
            data-testid="product-detail-image"
          />
          <div>
            <p>{ id }</p>
          </div>
        </div>
        <button
          type="button"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  };

  render() {
    return (
      <section>
        {
          this.createProductPage()
        }
      </section>
    );
  }
}

ProductPage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};
