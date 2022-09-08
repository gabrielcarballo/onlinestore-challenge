import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const {
      title,
      id,
      price,
    } = this.props;
    return (
      <div>
        <h2>{ title }</h2>
        <p>{ price }</p>
        <p>{ id }</p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
