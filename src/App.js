import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import Checkout from './containers/Checkout/Checkout'
import {Route, Switch} from "react-router-dom";
import { Burgerbuilder } from './containers/Burgerbuilder/Burgerbuilder';

export class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={Burgerbuilder} /> 
            <Route path="/checkout" component={Checkout} /> 
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App

