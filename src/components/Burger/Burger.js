// This iwll be the burger that will be rendered to the screen.
import React from "react";

import classes from "./Burger.css"; //Do not forget to add the CSS extension when you are importing CSS.
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  //The keys() method extracts the keys of a given object and turns that into an array of the keys.
  //Array(3) basically gives me 3 empty spaces.
  const transformedIngredients = Object.keys(props.ingredients) //At this point this will make an array of the ingredients like this [bread-top, bread-bottom, meat, cheese]
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_,i) =>{
          <BurgerIngredient key = {igKey + i} type = {igKey} />
      })
      
    });
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      <BurgerIngredient type="meat" />
      <BurgerIngredient type="cheese" />
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
