import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { login } from "../redux/actions/auth";

//import { Button, Card, Image } from 'semantic-ui-react'

class LoginPage extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.login)}>
        <Field name="email" component="input" type="email" />
        <Field name="password" component="input" type="password" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

LoginPage = reduxForm({
  form: 'login'
})(LoginPage);

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data))
});

LoginPage = connect(
  null,
  mapDispatchToProps
)(LoginPage);

export default LoginPage;