import React from 'react'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import Logo from '../Logo/Logo'
import classes from './Toolbar.module.css'

function Toolbar() {
    return (
        <div className={classes.Toolbar}>
            <p>Menu</p>
            <Logo /> 
            <nav>
                <NavigationItems />
            </nav>
        </div>
    )
}

export default Toolbar
