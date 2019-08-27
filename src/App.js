import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {



  render() {
    return (
      <div>
        <Layout> {/* Not a self closing component because we want to wrap other components with this.   */}
       <BurgerBuilder/>
        </Layout>
      </div>
    );
  }
}

export default App;

//Containers are stateful components and components in the components folder is dumb or presentational.