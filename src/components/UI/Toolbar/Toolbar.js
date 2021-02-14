import React from 'react'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import DrawerToggle from '../../Navigation/SideDrawer/DrawerToggle/DrawerToggle'
import Logo from '../Logo/Logo'
import classes from './Toolbar.module.css'
import {connect} from 'react-redux'

function Toolbar(props) {
    return (
        <div className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <div className={classes.Logo}><Logo /></div>
            <nav className={classes.DesktopOnly}><NavigationItems isAuth={props.isAuth}/></nav>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuth : state.authReducer.token,
    }
}

export default connect(mapStateToProps)(Toolbar)
