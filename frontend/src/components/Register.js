import React from 'react';
import { Credentials } from './Credentials';

export function Register(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onSignupSubmit({
      name: props.name,
      lastname: props.lastname,
      email: props.email,
      password: e.target.password.value,
      role: e.target.role.value,
    });
  }
  return (
    <section className='credentials'>
      <Credentials
        handleNameChange={props.onNameChange}
        handleLastnameChange={props.onLastnameChange}
        handleEmailChange={props.onEmailChange}
        handlePasswordChange={props.onPasswordChange}
        title='Sign up'
        buttonText='Sign up'
        linkText='Already a member? Log in here!'
        link='/login'
        onSubmit={handleSubmit}
      />
    </section>
  );
}
