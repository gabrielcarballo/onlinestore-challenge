import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CartBtn from './components/CartBtn';
import CartPage from './components/CartPage';
import ProductPage from './components/ProductPage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={ HomePage } />
            <Route exact path="/home/:id" component={ ProductPage } />
            <Route exact path="/CartPage" component={ CartPage } />
          </Switch>
          <CartBtn />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
