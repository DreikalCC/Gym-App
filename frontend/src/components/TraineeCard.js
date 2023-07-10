import React from 'react';
//import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { TrainerExerciseCard } from './TrainerExerciseCard';

export function TraineeCard({
  data,
  routine,
  handleEraseExerciseClick,
  handleDescriptionChange,
  handleExerciseChange,
  onSubmit,
}) {
  const user = data;
  console.log('usuario que se le pone ejercicio', user);
  const userRoutine = routine.filter((e) => e.owner[0] === user._id);
  console.log('rutina recibida', userRoutine);

  return (
    <div className='element'>
      <div className='element__group_user'>
        <h3 className='element__location'>{user.name}</h3>
        {userRoutine.map((exercise) => {
          return (
            <TrainerExerciseCard
              user={user}
              key={exercise._id}
              data={exercise}
              onEraseClick={handleEraseExerciseClick}
            />
          );
        })}
        <form onSubmit={onSubmit} className='edit__form'>
          <fieldset className='input'>
            <label className='input__field'>
              <input
                required
                id='exercise-name-input'
                name='exercise'
                onChange={handleExerciseChange}
                type='text'
                placeholder='Ejercicio'
                className='input__form input__name input__name_gallery'
                minLength='2'
                maxLength='30'
              />
              <span className='input__form-error card-name-input-error'></span>
            </label>
            <label className='input__field'>
              <input
                required
                id='description-input'
                name='description'
                onChange={handleDescriptionChange}
                type='text'
                placeholder='Descripción'
                className='input__form input__description'
              />
              <span className='input__form-error card-url-input-error'></span>
            </label>
            <input
              style={{ display: 'none' }}
              name='user'
              id='user'
              value={user._id}
              readOnly
            />
          </fieldset>
          <button type='submit' className='edit__submit-btn'>
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}
