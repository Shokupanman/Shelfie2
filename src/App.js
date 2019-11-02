import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Form from "./Components/Form/Form";
import Header from "./Components/Header/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route path="/add" component={Form}></Route>
          <Route path="/edit/:id" component={Form}></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
