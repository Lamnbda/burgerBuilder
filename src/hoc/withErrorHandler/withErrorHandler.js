import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import axios from "axios";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
        error: null
    }

    componentWillMount(){ //This will allow us to set up our global interceptors. This is the reason by this became a class based component. //Also updates state/triggerse rerender. 
      //This is called after all child components have been rendered. 
      //componentDidMount will not work because it isn't called until the componentDidMount in the wrapped element is called. So now we use componentWillMount.
      //The alternative to componentWillMount is to just call the interceptors early within the constructor
        this.reqInterceptor = axios.interceptors.request.use(req => {
            this.setState({error: null});
            return req;
        })
        this.resInterceptor = axios.interceptors.response.use(res => res, error => { //res => res means to simply just return the response. The second argument err means if there happens to be an error, change the state to error
            this.setState({error: error});
        })
    }

    //If in a functional component, using useEffect hook, you write this code in the return of useEffect.
    componentWillUnmount(){ //This executes when a component is not needed anymore
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    errorConfirmedHandler = () => {
        this.setState({error: null})
    }

    //Anon class. Class factory
    render() {
      return (
        <Auxiliary>
          <Modal show = {this.state.error} modalClosed = {this.errorConfirmedHandler}>{this.state.error ? this.state.error.message : null}</Modal>
          <WrappedComponent {...this.props} /> {/* This is burger builder because in burgerbuilder, it is wrapped with withErrorHandler */}
        </Auxiliary>
      );
    }
  };
};

export default withErrorHandler;
