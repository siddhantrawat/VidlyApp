import React, { Component } from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "./component/movies";
import NavBar from "./component/navBar";
import NotFound from "./component/notfound";
import Customers from "./component/customers";
import Rentals from "./component/rentals";
import MovieForm from "./component/movieForm";
import LoginForm from "./component/loginForm";
import RegisterForm from "./component/registerForm";
import Logout from "./component/logout";
import auth from "./sevices/authService";
import ProtectedRoute from "./common/protectedRoute";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/register"
              render={props => <RegisterForm {...props} />}
            ></Route>
            <Route
              path="/login"
              render={props => <LoginForm {...props} />}
            ></Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route
              path="/movies"
              render={props => <Movies user={this.state.user} {...props} />}
            ></Route>
            <Route path="/customers" render={() => <Customers />} />
            <Route path="/rentals" render={() => <Rentals />} />
            <Route path="/not-found" render={() => <NotFound />} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
