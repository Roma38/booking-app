import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import { getHalls } from "./redux/actions/halls";
import { getTickets } from "./redux/actions/tickets";
import { API_HOST } from "./config";
import Header from "./components/Header/Header"


class App extends Component {
  componentDidMount() {
    this.props.getHalls(`${API_HOST}:4000/halls`);
    this.props.getTickets(`${API_HOST}:4000/tickets`);
  }

  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

const mapStateToProps = ({ halls, tickets }) => ({ halls, tickets });

const mapDispatchToProps = dispatch => ({
  getHalls: url => dispatch(getHalls(url)),
  getTickets: url => dispatch(getTickets(url))
});

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;
