import React from 'react';
import { Link } from 'react-router-dom';

export function Credentials({
  title,
  buttonText,
  linkText,
  link,
  handlePasswordChange,
  handleEmailChange,
  handleUserNameChange,
  handleLastnameChange,
  onSubmit,
}) {
  const [radioState,setRadioState] = React.useState(false);
  return (
    <>
      <form className='credentials__form' to='/main' onSubmit={onSubmit}>
        <h3 className='credentials__title'>{title}</h3>
        <fieldset className='input'>
          <input
            required
            name='name'
            type='name'
            placeholder='Name'
            className='input__form input__form_credentials'
            onChange={handleUserNameChange}
          />
          <input
            required
            name='lastname'
            type='lastname'
            placeholder='Lastname'
            className='input__form input__form_credentials'
            onChange={handleLastnameChange}
          />
          <input
            required
            name='email'
            type='email'
            placeholder='Email'
            className='input__form input__form_credentials'
            onChange={handleEmailChange}
          />
          <input
            required
            name='password'
            type='password'
            placeholder='Password'
            className='input__form input__form_credentials'
            onChange={handlePasswordChange}
          />
          <div className='input__radio'>
            <input name='role' type="radio" id='trainee' value="trainee" checked={true} onClick={()=>{setRadioState=false}}/>
            <label for="trainee">Usuario</label>
            <input name='role' type="radio" id='trainer' value="trainer" onClick={()=>{setRadioState=true}}/>
            <label for='trainer' >Entrenador:</label>
            <input
              required
              disabled={!radioState}
              name='auth'
              type='text'
              placeholder='Codigo de verificación'
              className='input__form input__form_credentials'
              onChange={handleTrainerChange}
            />
          </div>
          <button
            type='submit'
            className='edit__submit-btn edit__submit-btn_log'
          >
            {buttonText}
          </button>
        </fieldset>
      </form>
      <Link className='credentials__link' to={link}>
        {linkText}
      </Link>
    </>
  );
}
