import React from 'react';
import { Credentials } from './Credentials';

export function Register(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onSignupSubmit({
      name: e.target.name.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: e.target.role.value,
    });
  }
  return (
    <section className='credentials'>
      <Credentials
        handleNameChange={props.handleNameChange}
        handleLastnameChange={props.handleLastnameChange}
        handleEmailChange={props.handleEmailChange}
        handleTrainerCodeChange={props.handleTrainerCodeChange}
        handlePasswordChange={props.handlePasswordChange}
        title='Sign up'
        buttonText='Sign up'
        linkText='Already a member? Log in here!'
        link='/login'
        onSubmit={handleSubmit}
      />
    </section>
  );
}
