import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandling from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  //Global consts in capital characters.
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 0.7
};

//Places where we change state alot is the same place where we should check for eficiency.

class BurgerBuilder extends Component {
  // We create a class because we want to manage the component

  state = {
    ingredients: null, //This is set to null initially because we are now fetching in the componentDidMount
    //This has the count of the ingredients made.
    //We are making key value pairs. Nmaes of the ingredients nad the amount of ingredients. Keys are the names of the ingredients.
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    //This is good for fetching data.
    //called after all child components have been rendered. 
    axios
      .get("https://react-my-burger-c4093.firebaseio.com/ingredients.json") //Send a request to firebase with the information
      .then(response => {
        //the .then is made to handle the response from fetching the data.
        this.setState({ ingredients: response.data });
      })
      .catch(error => {this.setState({error: true})});
  }

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

  clearOrderHandler = () => {
    const clearOrder =
      this.state.ingredients["salad"] - this.state.ingredients["salad"];

    this.updatePurchaseState(clearOrder);
    this.setState({
      ingredients: 0,
      totalPrice: 4
    });
    console.log(this.state);
  };

  purchaseHandler = () => {
    //If this method is triggered through an event, you want to set the method like JS6.
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert("Continued");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice, //In production, you want to recalcualte here to avoid them changing the price here.
      customer: {
        name: "Vincent L",
        address: {
          street: "streetstreet",
          zipCode: "1231232321",
          country: "Contree"
        },
        email: "emaiaia"
      },
      deliveryMethod: "fast"
    };

    axios
      .post("/orders.json", order) //For firebaser specifically, you must add .json. Also firebase will make a .json folder in firebase.
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
        console.log(error);
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    //in operator returns true if the property is found within the object.
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; //This will give me true or false for disabledinfo[key].
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Something has gone wrong</p> : <Spinner />; //If there is an error, the page will display a message. Otherwise, the spinner be set to default.

    if (this.state.ingredients) {
      //if ingredients exist
      burger = ( //This should only be the case if the burger has ingredients
        <Auxiliary>
          {/* //You have to add auxilliary because there are 2 adjacent elements */}
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addedIngredient={this.addIngredientHandler}
            removedIngredient={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
            clearOrder={this.clearOrderHandler}
          />
        </Auxiliary>
      );
      orderSummary = ( //orderSummary is added to the if statement because it uses ingredients and it is initially null. 
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelled={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandling(BurgerBuilder, axios);
