import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EvaluationBtn extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <button
        type="submit"
        onClick={ handleClick }
        data-testid="submit-review-btn"
      >
        Avaliar

      </button>
    );
  }
}

EvaluationBtn.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
