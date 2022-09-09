import React, { Component } from 'react';
import cart from '../services/cartItems';

export default class CartPage extends Component {
  state = {
    cartPage: true,
    cartItems: [],
  };

  componentDidMount() {
    this.setState({
      cartItems: cart,
    });
  }

  render() {
    const { cartPage, cartItems } = this.state;
    return (
      <div>
        {cartPage ? (

          <ol>
            {cartItems.map((produto) => {
              const { title, price, thumbnail, id } = produto;
              return (
                <li key={ id }>
                  <div>
                    <img src={ thumbnail } alt={ title } />
                    <p data-testid="shopping-cart-product-name">{title}</p>
                    <p>
                      Preço: R$
                      {price}
                    </p>
                    <p
                      data-testid="shopping-cart-product-quantity"
                    >
                      Quantidade:
                      {cart.length}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <h1 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h1>
        )}
      </div>
    );
  }
}
