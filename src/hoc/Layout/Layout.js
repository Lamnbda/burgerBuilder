import React, {Component} from "react";
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css' //classes refers to CSS classes itself. 
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => { //This is setup like an ES6 func so that the this will always refer to this class specifically. 
    this.setState({showSideDrawer: false})
  }

  sideDrawerOpenHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer} //This is done because it is not good to change the state with ! so we did this. 
    })
  }

  render(){
    return (  <Auxiliary>
      <Toolbar toggleClick = {this.sideDrawerOpenHandler}/>
      <SideDrawer closed = {this.sideDrawerClosedHandler} open = {this.state.showSideDrawer} openDrawer = {this.sideDrawerOpenHandler}/>
      <main className ={classes.Content}>{this.props.children}</main> {/* props.children essentially displays whatever is in the prop. */}
  
    </Auxiliary>);
  }
} 

export default Layout;