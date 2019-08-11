import React, {Component} from "react";
import PropTypes from 'prop-types';
import classes from "./BurgerIngredient.css"; //Remember to include the css extension when you are importing the CSS

class BurgerIngredient extends Component {
    render(){
        let ingredient = null;

        switch (this.props.type) {
          case ("bread-bottom"):
            ingredient = <div className={classes.BreadBottom} />;
            break;
          case ("bread-top"):
            ingredient = ( //Multiple lines of JSX means that I have to use parenthesis to represent the whole thing.
              <div className={classes.BreadTop}>
                <div className={classes.Seeds1} />
                <div className={classes.Seeds2} />
              </div>
            );
            break;
          case ("meat"):
            ingredient = <div className={classes.Meat} />;
            break;
          case ("cheese"):
            ingredient = <div className={classes.Cheese} />;
            break;
          case ("salad"):
            ingredient = <div className={classes.Salad} />;
            break;
          case ("bacon"):
            ingredient = <div className={classes.Bacon} />;
            break;
          default:
            null;
        }
        return ingredient;
    }
} 
BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}; //This is a javascript object, hence assigning it curly brackets. 
//Type is what props refers to which is why we use type here. 

export default BurgerIngredient;

//To make use the prop type check, tpye in sudo npm install --save prop-types. Don't forget to import the PropTypes. 