import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from'./NavigationItems.module.css'

function NavigationItems(props) {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" >Burger Bulder</NavigationItem>
            {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {!props.isAuth 
            ? <NavigationItem link="/auth">Authenticate</NavigationItem> 
            : <NavigationItem link="/logout"> Logout </NavigationItem>}
            
        </ul>
    )
}

export default NavigationItems
