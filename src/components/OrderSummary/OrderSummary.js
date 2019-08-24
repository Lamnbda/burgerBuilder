import React, {Component} from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Button from '../UI/Buttons/Button';

class OrderSummary extends Component {
  componentWillUpdate(){
    console.log('[OrderSummary] willupdate')
  }
  
  render(){
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key = {igKey} >
          <span style={{ textTransform: "capitalize" }}>{igKey} </span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return( <Auxiliary>
      <h3>Your order</h3>
      <p>Your delicious Burger with the following ingredients: </p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType = "Danger" clicked = {this.props.cancelled} >Cancel</Button>
      <Button btnType = "Success" clicked = {this.props.continue} >Continue</Button>
    </Auxiliary>);
  }
}


export default OrderSummary;
