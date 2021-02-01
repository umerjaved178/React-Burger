import React from 'react'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import Toolbar from '../UI/Toolbar/Toolbar'
import classes from './Layout.module.css'

class Layout extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             showSideDrawer: false
        }
    }
    
    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState)=>{return{showSideDrawer: !prevState.showSideDrawer}})
    }

    render() {
        return (
            <div >
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout
