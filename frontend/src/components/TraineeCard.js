import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { TrainerExerciseCard } from './TrainerExerciseCard';

export function TraineeCard({
  data,
  handleEraseExerciseClick,
  handleDescriptionChange,
  handleExerciseChange,
  onSubmit,
}) {
  const user = data;
  const currentUser = useContext(CurrentUserContext);
  const isOwn = user.trainer[0]._id === currentUser._id;
  const userClassName = `${isOwn ? 'element' : 'element_disabled'}`;

  return (
    <div className={userClassName}>
      <div className='element__group_user'>
        <h3 className='element__location'>{user.name}</h3>
        {user.exercises.map((exercise) => {
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
