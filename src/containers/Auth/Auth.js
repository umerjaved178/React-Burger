import React, { Component } from 'react'
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux'
import {auth_async} from '../../redux/actions/auth'
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';


export class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        inSignupMode: true
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.inSignupMode)
    }

    switchMode = () => {
        this.setState(prevState=> ({
            inSignupMode: !prevState.inSignupMode
        }))
    }

    render() {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        const form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        let formUi = (
            <form onSubmit={this.submitHandler}>
                {form}
                <button className={classes.Btn} type="submit">Submit</button>
            </form>
        )
        if(this.props.loading){
            formUi = <Spinner />
        }

        let errormessage = null;
        if(this.props.error){
            errormessage = this.props.error.message
        }

        let redirect = null
        if(this.props.isAuth){
            redirect = <Redirect to='/' />
        }

        return (
            <div className={classes.Auth}>
                {redirect}
                <h3> {this.state.inSignupMode? "Sign Up" : "Sign in"} </h3>
                    {errormessage}
                    {formUi}
                <h5 onClick={this.switchMode}> Switch to {this.state.inSignupMode ? "Sign in": "Sign up"}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuth: state.authReducer.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, inSignupMode) => dispatch(auth_async(email, password, inSignupMode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
