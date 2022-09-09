import React, { Component } from 'react';
import { getCategories, getProductsFromCategory, getProductsFromCategoryAndQuery } from '../services/api';
import Aside from './Aside';
import ProductCard from './ProductCard';

export default class HomePage extends Component {
  state = {
    filter: '',
    haveContent: false,
    searchResult: true,
    queryInput: '',
    productsArray: [],
    categories: [],
  };

  async componentDidMount() {
    const categ = await getCategories();
    this.setState({ categories: categ });
  }

  inputHandle = (event) => {
    const { target: { value } } = event;
    this.setState({ queryInput: value });
  };

  buttonHandler = async (event) => {
    const found = 0;
    const { queryInput, filter } = this.state;
    event.preventDefault();
    const filtro = await getProductsFromCategory(filter);
    this.setState({ productsArray: filtro });
    const products = await getProductsFromCategoryAndQuery({
      categoryId: filter,
      query: `${queryInput}`,
    });
    const { results } = products;
    this.setState({ productsArray: results });
    if (results.length === found) {
      this.setState({ searchResult: true });
    } else {
      this.setState({ searchResult: false });
    }
    this.setState({ haveContent: true });
  };

  filterItem = async (event) => {
    const { target: { value } } = event;
    console.log(value)
    this.setState({ filter: value })
    const products = await getProductsFromCategory(value);
    console.log(products)
    const { results } = products;
    this.setState({ productsArray: results });
    this.setState({ searchResult: false });
    this.setState({ haveContent: true });
  }

  render() {
    const { haveContent, productsArray, searchResult, categories } = this.state;
    
    return (
      <div>
        <div
          onChange={ this.filterItem }
        >
          <Aside />
        </div>
        <form
          action=""
        >
          <input
            type="text"
            data-testid="query-input"
            onChange={ this.inputHandle }
          />
          <button
            type="submit"
            data-testid="query-button"
            onClick={ this.buttonHandler }
          >
            pesquisar
          </button>
        </form>
        {(
          haveContent
            ? (
              <div>
                {
                  searchResult
                    ? (
                      <p>
                        Nenhum produto foi encontrado
                      </p>
                    )
                    : (
                      <ul>
                        {
                          productsArray.map((product) => {
                            const { title, id, price } = product;
                            return (
                              <li
                                key={ id }
                                data-testid="product"
                              >
                                <ProductCard
                                  id={ id }
                                  price={ price }
                                  title={ title }
                                />
                              </li>
                            );
                          })
                        }
                      </ul>
                    )
                }
              </div>
            )
            : (
              <h1 data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h1>
            )
        )}
      </div>
    );
  }
}
