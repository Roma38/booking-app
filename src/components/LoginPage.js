import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { login } from "../redux/actions/auth";
import { Button, Form, Header } from 'semantic-ui-react';
import "./AuthForm.css";
import { ReduxFormInput, required, minLength, email} from "../ReduxFormConstants";

//import { Button, Card, Image } from 'semantic-ui-react'

class LoginPage extends Component {
  render() {
    return (
      <Form loading={this.props.submitting} onSubmit={this.props.handleSubmit(this.props.login)} className="auth-form">
        <Header as="h1">Login</Header>
        <Field name="email" component={ReduxFormInput} validate={[required, email]} />
        <Field name="password" component={ReduxFormInput} validate={[required, minLength]} type="password" />
        <Button type="submit">Submit</Button>
      </Form>
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