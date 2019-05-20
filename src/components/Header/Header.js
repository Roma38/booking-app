import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { connect } from "react-redux";
import './Header.css';

class Header extends Component {
  render() {
    const {authState} = this.props.auth
    return (
      <header className="header">
        <h1>CubeX Hotel</h1>
        {authState === "unauthorized" && <Button.Group>
          <Button>Register</Button>
          <Button.Or text='or' />
          <Button>Log In</Button>
        </Button.Group>}
      </header>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

Header = connect(
  mapStateToProps
)(Header);

export default Header;