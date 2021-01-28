import React from 'react'
import classes from './Toolbar.module.css'

function Toolbar() {
    return (
        <div className={classes.Toolbar}>
            <p>Menu</p>
            {/* <img src='../' /> */}
            <p>Logoo</p>
            <p>navigation items</p>
        </div>
    )
}

export default Toolbar
