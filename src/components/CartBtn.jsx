import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class CartBtn extends Component {
  render() {
    return (
      <div>
        <NavLink to="/CartPage" data-testid="shopping-cart-button">
          Carrinho de Compras
        </NavLink>
      </div>
    );
  }
}
