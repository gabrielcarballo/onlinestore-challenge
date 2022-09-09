import React, { Component } from 'react';
import CartBtn from './CartBtn';

export default class Header extends Component {
  render() {
    return (
      <div>
        <div>Header</div>
        <CartBtn />
      </div>
    );
  }
}
