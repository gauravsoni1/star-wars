import React from "react";
import { Route, Switch } from "react-router-dom";

//Components
import Login from "./container/login/login";
import Search from "./container/search/search";
import PrivateRoute from "./components/privateRoute/privateRoute";

function App() {
  return (
    <>
      <Switch>
        <PrivateRoute path="/search" component={Search} />
        <Route path="/login" exact component={Login} />
        <Route path="/" component={Login} />
      </Switch>
    </>
  );
}

export default App;
