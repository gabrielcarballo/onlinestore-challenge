import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class Aside extends Component {
  state = {
    categorieName: '',
  };

  async componentDidMount() {
    const categories = await getCategories();

    this.setState({
      categorieName: categories.map((t) => (
        <li key={ t.id } data-testid="category">
          <input
              type="radio"
              name="categorie"
              value={ t.id }
              id={ t.id }
            />
          <label htmlFor={ t.id }>{ t.name }</label>
        </li>
      )),
    });
  }

  render() {
    const { categorieName } = this.state;
    return (
      <div>
        <h4>Categorias</h4>
        <ul>
          { categorieName }
        </ul>
      </div>
    );
  }
}

// Aside.propTypes = {
//   categorieName: PropTypes.string,
//   id: PropTypes.string,
//   name: PropTypes.string,
// };
