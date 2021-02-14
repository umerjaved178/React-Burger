import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../redux/actions/auth'
import { emptyOrder } from '../../../redux/actions/order';


export class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
        this.props.emptyOrder()
    }

    render() {
        return (
            <div>
                
               <Redirect to="/" />
               
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout()),
        emptyOrder: () => dispatch(emptyOrder())
    }
}


export default connect(null, mapDispatchToProps)(Logout)
