import React from 'react';
import { Link } from 'react-router-dom';

export function Credentials({
  title,
  buttonText,
  linkText,
  link,
  handlePasswordChange,
  handleEmailChange,
  handleNameChange,
  handleLastnameChange,
  onSubmit,
}) {
  const [radioState, setRadioState] = React.useState(false);
  const [trainerCode, setTrainerCode] = React.useState('');
  const handleTrainerCodeChange = (e) => setTrainerCode(e.target.value);
  const correctCode = () => {
    if (!radioState) {
      return true;
    }
    if (radioState) {
      if (trainerCode === 'Train') {
        return true;
      } else {
        return false;
      }
    }
  };
  const isFull = title === 'Sign up';
  const fullClassName = `${
    isFull ? 'input__form input__form_credentials' : 'input__form_disabled'
  }`;
  return (
    <>
      <form className='credentials__form' to='/main' onSubmit={onSubmit}>
        <h3 className='credentials__title'>{title}</h3>
        <fieldset className='input'>
          <input
            required={isFull}
            name='name'
            type='name'
            placeholder='Name'
            className={fullClassName}
            onChange={handleNameChange}
          />
          <input
            required={isFull}
            name='lastname'
            type='lastname'
            placeholder='Lastname'
            className={fullClassName}
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
          <div className={isFull ? 'input__radio' : 'input__form_disabled'}>
            <label className='input__radio_user'>
              <input
                required={isFull}
                name='role'
                type='radio'
                id='trainee'
                value='trainee'
                onClick={() => {
                  setRadioState(false);
                }}
              />
              &nbsp;Usuario
            </label>
            <label className='input__radio_user'>
              <input
                name='role'
                type='radio'
                id='trainer'
                value='trainer'
                onClick={() => {
                  setRadioState(true);
                }}
              />
              &nbsp;Entrenador:
            </label>
            <input
              required={isFull}
              disabled={!radioState}
              name='auth'
              type='text'
              placeholder='Codigo de verificación'
              className='input__form input__form_credentials'
              onChange={handleTrainerCodeChange}
            />
          </div>
          <button
            disabled={!correctCode}
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
