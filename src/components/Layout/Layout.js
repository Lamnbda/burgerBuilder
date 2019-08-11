import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import classes from './Layout.css' //classes refers to CSS classes itself. 

const layout = (props) => (
  <Auxiliary>
    <div>Toolbar, sidebar, backdrop</div>
    <main className ={classes.Content}>{props.children}</main> {/* props.children essentially displays whatever is in the prop. */}
  </Auxiliary>
)

export default layout;