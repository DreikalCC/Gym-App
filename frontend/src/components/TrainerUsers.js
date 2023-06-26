import React, { useContext } from 'react';
import { TraineeCard } from './TraineeCard';
import { Welcome } from './Welcome';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function TrainerUsers(props) {
  //console.log("props on trainer to trainercard", props);
  const currentUserContext = useContext(CurrentUserContext);
  function handleSubmit(e) {
    e.preventDefault();
    props.handleAddExercise({
      name: e.target.exercise.value,
      description: e.target.description.value,
      user: e.target.user.value,
    });
  }
  return (
    <>
      <section className='profile'>
        <div className='profile__info'>
          <h1 className='profile__name'>Hola: {currentUserContext.name}</h1>
        </div>
      </section>

      <section className='elements'>
        {!props.userList || !props.userList.length ? (
          <Welcome />
        ) : (
          props.userList.map((user) => {
            return (
              <TraineeCard
                key={user._id}
                data={user}
                temp={props.temp}
                handleEraseExerciseClick={props.handleEraseExerciseClick}
                onSubmit={handleSubmit}
              />
            );
          })
        )}
      </section>
    </>
  );
}
