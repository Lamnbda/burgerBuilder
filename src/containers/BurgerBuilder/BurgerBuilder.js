import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    // We create a class because we want to manage the component

    state = {
        ingredients: { //We are making key value pairs. Nmaes of the ingredients nad the amount of ingredients. Keys are the names of the ingredients.
            
            salad: 5,
            bacon: 0,
            cheese: 2,
            meat: 0
    }} 
    render(){
        return (
            <Auxiliary>
            <Burger ingredients = {this.state.ingredients}/>
            <BuildControls/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;