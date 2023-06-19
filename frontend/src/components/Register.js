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
    });
  }
  return (
    <section className='credentials'>
      <Credentials
        title='Sign up'
        buttonText='Sign up'
        linkText='Already a member? Log in here!'
        link='/login'
        onSubmit={handleSubmit}
      />
    </section>
  );
}
