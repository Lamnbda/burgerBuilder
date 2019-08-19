import React from "react";
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';


const navigationItems = () => (
  <ul className = {classes.NavigationItems}>
      <NavigationItem link ='/' active >Burger Builder</NavigationItem> {/* Active is actually a boolean value so it is already set to true */}
      <NavigationItem link = '/'>Checkout</NavigationItem>
  </ul>
);

export default navigationItems;
