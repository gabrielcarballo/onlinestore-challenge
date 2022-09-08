import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Aside from './components/Aside';
import CartBtn from './components/CartBtn';
import CartPage from './components/CartPage';

class App extends React.Component {
  state = {
    categorie: '',
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/">
              <Aside />
              <HomePage />
            </Route>
            <Route exact path="/CartPage" component={ CartPage } />
          </Switch>
          <CartBtn />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
