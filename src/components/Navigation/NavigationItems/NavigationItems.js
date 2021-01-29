import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from'./NavigationItems.module.css'

function NavigationItems() {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>Burger Bulder</NavigationItem>
            <NavigationItem link="/">Checkout</NavigationItem>
        </ul>
    )
}

export default NavigationItems
