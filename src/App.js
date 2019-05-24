import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { getHalls } from "./redux/actions/halls";
import { getTickets } from "./redux/actions/tickets";
import { authSucceed } from "./redux/actions/auth";

import { Container } from "semantic-ui-react";
import HeaderComponent from "./components/HeaderComponent";
import SideBar from "./components/SideBar";
import HallsPage from "./components/HallsPage";
import Calendar from "./components/Calendar";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

class App extends Component {
  componentDidMount() {
    this.props.getHalls();
    this.props.getTickets();
    if (localStorage.getItem('token')) {
      this.props.authSucceed({_id: localStorage.getItem('_id'), email: localStorage.getItem('email'), token: localStorage.getItem('token') });

    }
  }

  render() {
    return (
      <Container>
        <HeaderComponent />
        <div className="wrapper">
          <SideBar />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/halls" />} />
            <Route path="/halls" component={HallsPage} />
            <Route path="/hall/:id" component={Calendar} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = ({ halls, tickets }) => ({ halls, tickets });

const mapDispatchToProps = dispatch => ({
  getHalls: () => dispatch(getHalls()),
  getTickets: () => dispatch(getTickets()),
  authSucceed: payload => dispatch(authSucceed(payload))
});

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;
