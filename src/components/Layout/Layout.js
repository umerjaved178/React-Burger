import React from 'react'
import Burgerbuilder from '../../containers/Burgerbuilder/Burgerbuilder'
import Toolbar from '../UI/Toolbar/Toolbar'
import classes from './Layout.module.css'

function Layout(props) {
    return (
        <div className={classes.Content}>
            <Toolbar />
            <Burgerbuilder />
        </div>
    )
}

export default Layout
