import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextArea extends Component {
  render() {
    const { handleTextArea, value } = this.props;
    return (
      <label htmlFor="textarea">
        <textarea
          name="textarea"
          placeholder="Digite seu comentário sobre o produto"
          onChange={ handleTextArea }
          data-testid="product-detail-evaluation"
          value={ value }
        />
      </label>
    );
  }
}

TextArea.propTypes = {
  handleTextArea: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
