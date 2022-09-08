import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class Aside extends Component {
  state = {
    categorieName: '',
    categorie: ''
  };

  setCategory = (event) => {
    const { target: { value } } = event;
    this.setState({ categorie: value });
  }

  async componentDidMount() {
    const categories = await getCategories();

    this.setState({
      categorieName: categories.map((t) => (
        <li key={ t.id } data-testid="category">
          <label htmlFor={ t.id }>
            <input
              type="radio"
              name=" "
              value={ t.name }
              onChange={ this.setCategory }
            />
            { t.name }
          </label>
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
