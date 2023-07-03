import React, { useContext } from 'react';
import { TraineeCard } from './TraineeCard';
import { Welcome } from './Welcome';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function TrainerUsers(props) {
  const currentUserContext = useContext(CurrentUserContext);
  function handleSubmit(e) {
    e.preventDefault();
    props.handleAddExercise({
      exercise: props.exercise,
      description: props.description,
      id: e.target.user.value,
    });
  }
  console.log('props', props);
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
                handleEraseExerciseClick={props.handleEraseExerciseClick}
                handleDescriptionChange={props.onDescriptionChange}
                handleExerciseChange={props.onExerciseChange}
                onSubmit={handleSubmit}
              />
            );
          })
        )}
      </section>
    </>
  );
}
