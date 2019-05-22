import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../redux/actions/auth"
import './Header.css';

class HeaderComponent extends Component {
  render() {
    const { authState } = this.props.auth
    return (
      <header className="header">
        <Header as='h1'>CubeX Hotel</Header>
        {authState === "unauthorized" && <Button.Group>
          <Button as={Link} to="/register">Register</Button>
          <Button.Or text='or' />
          <Button as={Link} to="/login">Log In</Button>
        </Button.Group>}
        {authState === "loading" && <Button.Group>
          <Button loading>Register</Button>
          <Button.Or text='or' />
          <Button loading>Log In</Button>
        </Button.Group>}
        {authState === "logedIn" &&
          <Button onClick={this.props.logOut}>Log Out</Button>}
      </header>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
});

HeaderComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent);

export default HeaderComponent;