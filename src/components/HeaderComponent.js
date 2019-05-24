import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../redux/actions/auth";
import './Header.css';
import { Message } from 'semantic-ui-react';
import { closePopup } from "../redux/actions/popup";


class HeaderComponent extends Component {
  render() {
    const { authState } = this.props.auth;
    const {closePopup, popup} = this.props;
    return (
      <header className="header">
        <Header as='h1'>Booking</Header>
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
        {authState === "loggedIn" &&
          <Button onClick={this.props.logOut}>Log Out</Button>}
        {popup.isVisible && <Message
          className="popup-message"
          onDismiss={closePopup}
          floating content={popup.content}
          {...popup.attributes} />}
      </header>
    );
  }
}

const mapStateToProps = ({ auth, popup }) => ({ auth, popup });
const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
  closePopup: () => dispatch(closePopup())
});

HeaderComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent);

export default HeaderComponent;