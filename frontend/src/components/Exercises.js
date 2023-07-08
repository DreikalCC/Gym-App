import React, { useContext } from 'react';
import { UserExerciseCard } from './UserExerciseCard';
import { Welcome } from './Welcome';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Exercises(props) {
  const currentUserContext = useContext(CurrentUserContext);
  const userRoutine = props.exercises.filter(
    (exe) => exe.owner === currentUserContext._id
  );
  return (
    <>
      <section className='profile'>
        <div className='profile__info'>
          <h1 className='profile__name'>
            Your trainer is: {currentUserContext.trainer[0].name}
          </h1>
        </div>
      </section>

      <section className='elements'>
        {!props.exercises || !props.exercises.length ? (
          <Welcome />
        ) : (
          userRoutine.map((exercise) => {
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
