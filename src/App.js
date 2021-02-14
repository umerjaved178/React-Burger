import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import {Route, Switch} from "react-router-dom";
import Burgerbuilder from './containers/Burgerbuilder/Burgerbuilder';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux'
import { authCheckState } from './redux/actions/auth';


export class App extends Component {

  componentDidMount() {
    this.props.authCheckState()
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={Burgerbuilder} /> 
            <Route path="/checkout" component={Checkout} /> 
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authCheckState: () => dispatch(authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App)

