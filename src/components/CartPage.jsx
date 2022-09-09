import React, { Component } from 'react';
import cart from '../services/cartItems';

export default class CartPage extends Component {
  state = {
    cartPage: false,
    cartItems: [],
  };

  componentDidMount() {
    this.setState({
      cartItems: cart,
    });
  }

  updateCart = () => {
    const noItens = 0;
    const {
      cartItems,
    } = this.state;
    if (cartItems.length === noItens) {
      this.setState({ cartPage: true });
    } else {
      this.setState({ cartPage: false });
    }
  }

  render() {
    const { cartPage, cartItems } = this.state;
    return (
      <div>
        {cartPage ? (
          <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
        ) : (
          <ol>
            {cartItems.map((produto) => {
              const { title, price, thumbnail, id } = produto;
              return (
                <li key={ id }>
                  <div>
                    <img src={ thumbnail } alt={ title } />
                    <p data-testid="shopping-cart-product-name">{ title }</p>
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
        )
        }
      </div>
    );
  }
}
