import React from 'react'
import Burgerbuilder from '../../containers/Burgerbuilder/Burgerbuilder'
import Toolbar from '../UI/Toolbar/Toolbar'


function Layout() {
    return (
        <div>
            <Toolbar />
            <p>Side Drawer</p>
            <p>BackDrop</p>
            <Burgerbuilder />
        </div>
    )
}

export default Layout
