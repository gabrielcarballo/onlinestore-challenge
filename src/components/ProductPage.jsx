import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import cart from '../services/cartItems';
import Rating from './Rating';
import Email from './Email';
import TextArea from './TextArea';
import EvaluationBtn from './EvaluationBtn';

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
    this.renderReview();
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
    };
    cart.push(objProduto);
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

  handleEmail = (event) => {
    const { target: { value } } = event;
    this.setState({
      email: value,
    });
  };

  handleTextArea = (event) => {
    const { target: { value } } = event;
    this.setState({
      text: value,
    });
  };

  handleRadio = (event) => {
    const { target: { value } } = event;
    this.setState({
      rating: value,
    });
  };

  handleClick = () => {
    const timeOut = 1000;
    const { email, text, rating } = this.state;
    const storageReview = {
      email,
      text,
      rating,
    };
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
    this.setState((prevState) => ({
      storageEvaluation: [...prevState.storageEvaluation, storageReview],
      email: '',
      text: '',
    }), () => this.saveAvaliations());
    setTimeout(() => {
      this.setState({
        checkReview: false,
      });
    }, timeOut);
  };

  saveAvaliations = () => {
    const { storageEvaluation, productInfos } = this.state;
    const { id } = productInfos;
    localStorage.setItem(id, JSON.stringify(storageEvaluation));
  };

  renderReview = () => {
    const { productInfos, storageEvaluation } = this.state;
    const { id } = productInfos;
    const idEvaluation = JSON.parse(localStorage.getItem(id));
    if (idEvaluation !== undefined) {
      storageEvaluation.push(idEvaluation);
      console.log(storageEvaluation);
    }
  };

  render() {
    const { checkReview, storageEvaluation, email, text, rating } = this.state;

    return (
      <div>
        <section>
          {
            this.createProductPage()
          }
        </section>
        <div>
          <form action="#">
            <Email handleEmail={ this.handleEmail } value={ email } />
            <Rating handleRadio={ this.handleRadio } value={ rating } />
            <TextArea handleTextArea={ this.handleTextArea } value={ text } />
            <EvaluationBtn handleClick={ this.handleClick } />
          </form>
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
