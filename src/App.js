import React from 'react';
import {Route} from "react-router-dom";

//Components
import Login from './container/login/login';
import Search from './container/search/search';
import PrivateRoute from './components/privateRoute/privateRoute';

function App() {

  return (
    <>
    <PrivateRoute path="/search" component={Search}/> 
    <Route path="/login" exact component={Login} />
    </>
  );
}

export default App;
