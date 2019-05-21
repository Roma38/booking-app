import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from "axios";
import { connect } from "react-redux";
import { register } from "../redux/actions/auth";

//import { Button, Card, Image } from 'semantic-ui-react'

class RegisterPage extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.register)}>
        <Field name="email" component="input" type="email" />
        <Field name="password" component="input" type="password" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

RegisterPage = reduxForm({
  form: 'register'
})(RegisterPage);

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(register(data))
});

RegisterPage = connect(
  null,
  mapDispatchToProps
)(RegisterPage);

export default RegisterPage;