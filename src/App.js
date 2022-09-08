import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Aside from './components/Aside';
import CartBtn from './components/CartBtn';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Aside />
            <HomePage />
          </Route>
        </Switch>
        <CartBtn />
      </div>
    </BrowserRouter>
  );
}

export default App;
