import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import Home from './services/components/Home';
import Product from './services/components/Product';
import ShoppingCart from './services/components/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/shopping-cart" component={ ShoppingCart } />
          <Route path="/product/:id" component={ Product } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
