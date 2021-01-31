import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.module.css'

class Modal extends React.Component {

    shouldComponentUpdate(nextProp, nextState) {
        return nextProp.show !== this.props.show || nextProp.children !== this.props.children
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.purchasingHandler}/>
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'traslateY(0)' : 'traslateY(-100)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal
