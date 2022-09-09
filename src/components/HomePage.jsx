import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

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
    this.createList();
  }

  inputHandle = (event) => {
    const { target: { value } } = event;
    this.setState({ queryInput: value });
  };

  createList = async () => {
    const found = 0;
    const { queryInput, filter } = this.state;
    const products = await getProductsFromCategoryAndQuery({
      categoryId: filter,
      query: queryInput,
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
    this.setState({ filter: value }, () => this.createList());
  };

  handleClick = (event) => {
    event.preventDefault();
    this.createList();
  };

  render() {
    const {
      haveContent,
      productsArray,
      searchResult,
      categories,
    } = this.state;

    return (
      <div
        className="homePage"
      >
        <div
          className="asideBar"
        >
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
              onClick={ this.handleClick }
            >
              pesquisar
            </button>
          </form>
          <ul
            onChange={ this.filterItem }
          >
            {
              categories.map((categorie) => {
                const {
                  id,
                  name,
                } = categorie;
                return (
                  <li
                    key={ id }
                    data-testid="category"
                  >
                    <input
                      type="radio"
                      name="categorie"
                      value={ id }
                      id={ id }
                    />
                    <label htmlFor={ id }>{ name }</label>
                  </li>
                );
              })
            }
          </ul>
        </div>
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
                      <ul
                        className="products"
                      >
                        {
                          productsArray.map((product) => {
                            const { title, price, thumbnail, id } = product;
                            return (
                              <Link 
                                to={ `/home/${id}` }
                                key={ id }
                                data-testid="product-detail-link"
                                className="productCard"
                              >
                                <li
                                  data-testid="product"
                                >
                                  <img src={ thumbnail } alt="" />
                                  <p>{ title }</p>
                                  <p>{ price }</p>
                                </li>
                              </Link>
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
