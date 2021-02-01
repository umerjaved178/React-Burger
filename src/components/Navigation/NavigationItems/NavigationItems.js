import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from'./NavigationItems.module.css'

function NavigationItems() {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" >Burger Bulder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
    )
}

export default NavigationItems
