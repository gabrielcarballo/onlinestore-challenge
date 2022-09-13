import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import EvaluationBtn from './EvaluationBtn';
import Form from './Form';
import { makeCartItem } from '../services/cartItems';


export default class ProductPage extends Component {
  state = {
    productInfos: {},
    email: '',
    text: '',
    rating: '',
    checkReview: false,
    storageEvaluation: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const apiReturn = await getProductById(id);
    this.setState({ productInfos: apiReturn });
    this.gotReview();
  }

  addToCart = () => {
    const {
      productInfos,
    } = this.state;
    const {
      id,
      title,
      price,
      thumbnail,
    } = productInfos;
    const objProduto = {
      title,
      price,
      thumbnail,
      id,
      quantity: 1,
    };
    makeCartItem(objProduto);
  };

  createProductPage = () => {
    const {
      productInfos,
    } = this.state;

    const {
      id,
      title,
      price,
      thumbnail,
    } = productInfos;
    return (
      <div>
        <div>
          <h1>
            <span data-testid="product-detail-name">{ title }</span>
            <span data-testid="product-detail-price">{ price }</span>
          </h1>
        </div>
        <div>
          <img
            src={ thumbnail }
            alt={ title }
            data-testid="product-detail-image"
          />
          <div>
            <p>{ id }</p>
          </div>
        </div>
        <button
          type="button"
          onClick={ this.addToCart }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  };

  handleForm = (event) => {
    const { target: { value, name } } = event;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { email, text, rating } = this.state;

    const storageReview = {
      email,
      text,
      rating,
    };
    this.formValidation();
    this.setState((prevState) => ({
      storageEvaluation: [...prevState.storageEvaluation, storageReview],
    }), () => this.clearForm());
    this.saveAvaliations();
  };

  saveAvaliations = () => {
    const { storageEvaluation, productInfos } = this.state;
    const { id } = productInfos;
    localStorage.setItem(id, JSON.stringify(storageEvaluation));
  };

  formValidation = () => {
    const { email, text, rating } = this.state;
    const timeOut = 1000;
    if (
      rating <= 0
      || text <= 0
      || email <= 0
      || !email.includes('@')
      || !email.includes('.')
    ) {
      this.setState({
        checkReview: true,
      });
    } else {
      this.setState({
        checkReview: false,
      });
    }
    setTimeout(() => {
      this.setState({
        checkReview: false,
      });
    }, timeOut);
  };

  gotReview = () => {
    const { match: { params: { id } } } = this.props;
    const idEvaluation = JSON.parse(localStorage.getItem(id));
    if (idEvaluation) {
      this.setState({
        storageEvaluation: idEvaluation,
      });
    }
  };

  clearForm = () => {
    this.setState({
      email: '',
      text: '',
    });
  };

  render() {
    const { checkReview, storageEvaluation, email, text } = this.state;

    return (
      <div>
        <section>
          {
            this.createProductPage()
          }
        </section>
        <div>
          <section>
            <Form handleForm={ this.handleForm } email={ email } text={ text } />
            <EvaluationBtn handleClick={ this.handleClick } />
          </section>
          {
            checkReview && <p data-testid="error-msg">Campos inválidos</p>
          }
        </div>
        <section>
          {storageEvaluation && storageEvaluation.map((item, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">{item.email}</p>
              <p data-testid="review-card-evaluation">{item.text}</p>
              <p data-testid="review-card-rating">{item.rating}</p>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

ProductPage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};
