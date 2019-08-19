import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  //Global consts in capital characters.
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 0.7
};

class BurgerBuilder extends Component {
  // We create a class because we want to manage the component

  state = {
    ingredients: {
      //This has the count of the ingredients made.
      //We are making key value pairs. Nmaes of the ingredients nad the amount of ingredients. Keys are the names of the ingredients.
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  };

  updatePurchaseState(ingredients) {
    //This in the end will return true or false. This is housed here because we know the state and how many of each we need
    const sum = Object.keys(ingredients) //Convert the object into an array of the ingredient names.
      .map(igKey => {
        return ingredients[igKey]; //Now mapping the array and through eachone iteratively,
      })
      .reduce((sum, el) => {
        //This flattens the array and adds them together.
        return sum + el;
      }, 0); //The 0 represents the starting number and the function represents the function to be executed on each element of the array.
    this.setState({ purchaseable: sum > 0 }); //This will return true or false.
  }

  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    console.log(updatedIngredients[type]);

    const currentPrice = this.state.totalPrice;
    const updatedPrice = INGREDIENT_PRICES[type] + currentPrice;
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const currentPrice = this.state.totalPrice;
    const updatedPrice = currentPrice - INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => { //If this method is triggered through an event, you want to set the method like JS6.
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    alert('Continued');
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    //in operator returns true if the property is found within the object.
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; //This will give me true or false for disabledinfo[key].
    }

    return (
      <Auxiliary>
        <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients} cancelled = {this.purchaseCancelHandler} continue = {this.purchaseContinueHandler} price = {this.state.totalPrice}/>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addedIngredient={this.addIngredientHandler}
          removedIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered = {this.purchaseHandler}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
