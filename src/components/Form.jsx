import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  render() {
    const { handleForm, email, text } = this.props;
    return (
      <form action="#">
        <label htmlFor="email">
          Digite seu e-mail
          <input
            name="email"
            type="email"
            value={ email }
            data-testid="product-detail-email"
            onChange={ handleForm }
          />
        </label>
        <label htmlFor="rating">
          Dê uma nota para o produto
          <input
            type="radio"
            name="rating"
            value="1"
            onChange={ handleForm }
            data-testid="1-rating"
          />
          1
          <input
            type="radio"
            name="rating"
            value="2"
            onChange={ handleForm }
            data-testid="2-rating"
          />
          2
          <input
            type="radio"
            name="rating"
            value="3"
            onChange={ handleForm }
            data-testid="3-rating"
          />
          3
          <input
            type="radio"
            name="rating"
            value="4"
            onChange={ handleForm }
            data-testid="4-rating"
          />
          4
          <input
            type="radio"
            name="rating"
            value="5"
            onChange={ handleForm }
            data-testid="5-rating"
          />
          5
        </label>
        <label htmlFor="text">
          <textarea
            name="text"
            value={ text }
            placeholder="Digite seu comentário sobre o produto"
            onChange={ handleForm }
            data-testid="product-detail-evaluation"
          />
        </label>
      </form>
    );
  }
}

Form.propTypes = {
  handleForm: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
