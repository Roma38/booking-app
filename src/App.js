import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { getHalls } from "./redux/actions/halls";
import { getTickets } from "./redux/actions/tickets";
import { authSucceed } from "./redux/actions/auth";
import { API_HOST } from "./config";

import { Container } from "semantic-ui-react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import HallsPage from "./components/HallsPage";
import Calendar from "./components/Calendar";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

class App extends Component {
  componentDidMount() {
    this.props.getHalls(`${API_HOST}:4000/halls`);
    this.props.getTickets(`${API_HOST}:4000/tickets`);
    localStorage.getItem('_id') 
    && localStorage.getItem('token') 
    && this.props.authSucceed(localStorage.getItem('_id'), localStorage.getItem('email'), localStorage.getItem('tokenI'));
  }

  render() {
    return (
      <Container>
        <Header />
        <div className="wrapper">
          <SideBar />
          <Switch>
            <Route exact path="/" component={HallsPage} />
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
  getHalls: url => dispatch(getHalls(url)),
  getTickets: url => dispatch(getTickets(url)),
  authSucceed: payload => dispatch(authSucceed(payload))
});

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;
