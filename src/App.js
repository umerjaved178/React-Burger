import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import {Route, Switch, Redirect} from "react-router-dom";
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
    let routes = (
          <Switch>
            <Route path="/" exact component={Burgerbuilder} /> 
            <Route path="/auth" component={Auth} />
            <Redirect to="/" />
          </Switch>
    )
    if(this.props.isAuth){
      routes = (
          <Switch>
            <Route path="/" exact component={Burgerbuilder} /> 
            <Route path="/checkout" component={Checkout} /> 
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Redirect to="/" />
          </Switch>)
    }
    return (
      <div>
        <Layout>
          {routes}
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

const mapStateToProps = state => {
  return  {
    isAuth: state.authReducer.token
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

