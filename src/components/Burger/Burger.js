// This iwll be the burger that will be rendered to the screen.
import React from "react";

import classes from "./Burger.css"; //Do not forget to add the CSS extension when you are importing CSS.
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  //The keys() method extracts the keys of a given object and turns that into an array of the keys.
  //Array(3) basically gives me 3 empty spaces.
  let transformedIngredients = Object.keys(props.ingredients)
    //At this point this will make an array of the ingredients like this [bread-top, bread-bottom, meat, cheese]. The object is now an array.
    .map(igKey => {
      //igKey is the ingredients. And because this is map, this will cycle through all the ingredients from the array made from keys.
      return [...Array(props.ingredients[igKey])].map((_,i) => { //_ represents the current value and i represents the index of the current element being processed in the array.
        //Now this is an array which is an arrays of spaces based on the number of ingredients from the state
        return <BurgerIngredient key={igKey + i} type={igKey} />; //Now for each of the arrays inside of the array, we will call for that specific ingredient. Key is just a string and just needs to be unique.
      });
    })

    //arr the always updated root array to be returned in the end. 
    .reduce((arr, el) => { //arr represents the inital value or the previously returned value of the function. The current val = el. Both of these are required to use reduce. 
      return arr.concat(el) //concat merges the 2 arrays into 1. 
    }, []);
    console.log(transformedIngredients);

    if (transformedIngredients.length === 0){
      transformedIngredients = <p>Please enter some ingredients.</p>
    } 

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
