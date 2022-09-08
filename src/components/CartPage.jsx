import React, { Component } from 'react';

export default class CartPage extends Component {
  state = {
    cart: false,
  };

  render() {
    const { cart } = this.state;
    return (
      <div>
        {cart ? (
          <p>xablau</p>
        ) : (
          <h1 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h1>
        )}
      </div>
    );
  }
}
