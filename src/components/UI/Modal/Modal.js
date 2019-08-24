import React, {Component} from "react";
import classes from "./Modal.css";

import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component{

  shouldComponentUpdate(nextProps, nextState){
    
      return nextProps.show !== this.props.show;
    
  }

  componentWillUpdate(){
    console.log('[Modal] WillUpdate')
  }

render(){
  return (<Auxiliary>
    <Backdrop 
    show={this.props.show}
    clicked = {this.props.modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: this.props.show ? "translateY(0)" : "translateY(-100vh)", //translateY(0) means to leave the element at the current position.
        opacity: this.props.show ? "1" : "0" //Likewise, having opacity at 1 will mean that the element will be fully shown.
      }}
    >
       
      {this.props.children}  {/* Displays content from the children in the modal component on burgerbuilder  */}
    </div>
  </Auxiliary>);
}
} 

export default Modal;
