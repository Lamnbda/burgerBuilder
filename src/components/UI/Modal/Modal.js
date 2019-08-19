import React from "react";
import classes from "./Modal.css";

import Auxiliary from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => (
  <Auxiliary>
    <Backdrop 
    show={props.show}
    clicked = {props.modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)", //translateY(0) means to leave the element at the current position.
        opacity: props.show ? "1" : "0" //Likewise, having opacity at 1 will mean that the element will be fully shown.
      }}
    >
       
      {props.children}  {/* Displays content from the children in the modal component on burgerbuilder  */}
    </div>
  </Auxiliary>
);

export default modal;
