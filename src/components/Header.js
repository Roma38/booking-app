import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../redux/actions/auth"
import './Header.css';

class Header extends Component {
  render() {
    const { authState } = this.props.auth
    return (
      <header className="header">
        <h1>CubeX Hotel</h1>
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

Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default Header;