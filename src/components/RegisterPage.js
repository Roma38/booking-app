import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { register } from "../redux/actions/auth";
import { Button, Form, Header } from 'semantic-ui-react';
import "./AuthForm.css";
import { ReduxFormInput, required, minLength, email} from "../ReduxFormConstants";

class RegisterPage extends Component {
  render() {
    return (
      <Form loading={this.props.submitting} onSubmit={this.props.handleSubmit(this.props.register)} className="auth-form">
        <Header as="h1">Register</Header>
        <Field name="email" component={ReduxFormInput} validate={[required, email]} />
        <Field name="password" component={ReduxFormInput} validate={[required, minLength]} type="password" />
        <Button type="submit">Submit</Button>
      </Form>
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