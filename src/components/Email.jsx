import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Email extends Component {
  render() {
    const { handleEmail, value } = this.props;
    return (
      <label htmlFor="email">
        Digite seu e-mail
        <input
          name="email"
          type="email"
          data-testid="product-detail-email"
          onChange={ handleEmail }
          value={ value }
        />
      </label>
    );
  }
}

Email.propTypes = {
  handleEmail: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
