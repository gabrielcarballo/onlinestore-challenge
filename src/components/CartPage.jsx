import React, { Component } from 'react';
import { decrease, exclude, exportCart, getLocal, increase } from '../services/cartItems';

export default class CartPage extends Component {
  state = {
    cartItems: [],
  };

  componentDidMount() {
    getLocal();
    this.addCart();
  }

  addCart = () => {
    const cartList = exportCart();
    this.setState({
      cartItems: cartList,
    });
  };

  render() {
    const { cartItems } = this.state;
    return (
      <div>
        {cartItems === null ? (
          <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
        ) : (
          <ol>
            {cartItems.map((produto) => {
              const { title, price, thumbnail, id, quantity } = produto;
              return (
                <li
                  key={ id }
                >
                  <div>
                    <img src={ thumbnail } alt={ title } />
                    <p data-testid="shopping-cart-product-name">{ title }</p>
                    <p>
                      Preço: R$
                      { price * quantity }
                    </p>
                    <div>
                      <button
                        type="button"
                        data-testid="product-decrease-quantity"
                        onClick={ () => {
                          decrease(id);
                          this.addCart();
                        } }
                      >
                        -
                      </button>
                      <p
                        data-testid="shopping-cart-product-quantity"
                      >
                        { quantity }
                      </p>
                      <button
                        type="button"
                        data-testid="product-increase-quantity"
                        onClick={ () => {
                          increase(id);
                          this.addCart();
                        } }
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={ () => {
                        exclude(id);
                        this.addCart();
                      } }
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    );
  }
}
