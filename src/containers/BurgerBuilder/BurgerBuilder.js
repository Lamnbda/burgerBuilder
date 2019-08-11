import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {
    // We create a class because we want to manage the component

    state = {
        ingredients: { //We are making key value pairs. Nmaes of the ingredients nad the amount of ingredients. Keys are the names of the ingredients.
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
    }} 
    render(){
        return (
            <Auxiliary>
            <Burger ingredients = {this.state.ingredients}/>
            <div>Build Controls</div>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;