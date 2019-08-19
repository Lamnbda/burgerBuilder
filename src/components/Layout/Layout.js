import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import classes from './Layout.css' //classes refers to CSS classes itself. 
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
  <Auxiliary>
    <Toolbar/>
    <SideDrawer/>
    <main className ={classes.Content}>{props.children}</main> {/* props.children essentially displays whatever is in the prop. */}

  </Auxiliary>
)

export default layout;