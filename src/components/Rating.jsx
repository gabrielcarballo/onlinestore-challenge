import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Rating extends Component {
  render() {
    const { handleRadio } = this.props;
    return (
      <label htmlFor="rating">
        Dê uma nota para o produto
        <input
          type="radio"
          name="rating"
          value="1"
          onChange={ handleRadio }
          data-testid="1-rating"
        />
        1
        <input
          type="radio"
          name="rating"
          value="2"
          onChange={ handleRadio }
          data-testid="2-rating"
        />
        2
        <input
          type="radio"
          name="rating"
          value="3"
          onChange={ handleRadio }
          data-testid="3-rating"
        />
        3
        <input
          type="radio"
          name="rating"
          value="4"
          onChange={ handleRadio }
          data-testid="4-rating"
        />
        4
        <input
          type="radio"
          name="rating"
          value="5"
          onChange={ handleRadio }
          data-testid="5-rating"
        />
        5
      </label>
    );
  }
}

Rating.propTypes = {
  handleRadio: PropTypes.func.isRequired,
};
