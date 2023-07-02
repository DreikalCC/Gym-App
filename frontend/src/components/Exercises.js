import React, { useContext } from 'react';
import { UserExerciseCard } from './UserExerciseCard';
import { Welcome } from './Welcome';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Exercises(props) {
  const currentUserContext = useContext(CurrentUserContext);
  return (
    <>
      <section className='profile'>
        <div className='profile__info'>
          <h1 className='profile__name'>
            Your trainer is: {currentUserContext.trainer[0].name}
          </h1>
          <button
            id='profile-btn'
            onClick={props.handleEditProfileClick}
            className='profile__info profile__edit-button'
          ></button>
          <p className='profile__description'>{currentUserContext.about}</p>
        </div>
      </section>

      <section className='elements'>
        {!props.exercises || !props.exercises.length ? (
          <Welcome />
        ) : (
          props.exercises.map((exercise) => {
            return (
              <UserExerciseCard
                key={exercise._id}
                data={exercise}
                handleExerciseCompletion={props.handleExerciseCompletion}
              />
            );
          })
        )}
      </section>
    </>
  );
}
