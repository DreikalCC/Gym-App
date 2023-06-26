import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function UserExerciseCard(props) {
  console.log('props in exercise card', props);
  const currentUser = useContext(CurrentUserContext);
  //console.log("current user in card", currentUser);
  const exercise = props.data;
  console.log('exercise inside the card', exercise);
  //console.log("exercise in card", exercise);
  const isCompleted = exercise.completed.some((i) => i === currentUser._id);
  console.log('is the exercise completed inside the card?', isCompleted);
  const exerciseCompletedClassName = `element ${
    isCompleted ? 'element_completed' : ''
  }`;
  const exerciseCompletedButtonClassName = `element__like ${
    isCompleted ? 'element__liked' : ''
  }`;

  return (
    <div className={exerciseCompletedClassName}>
      <div className='element__group element__group_user'>
        <h3 className='element__location'>{exercise.name}</h3>
        <p className='element__description'>{exercise.description}</p>
        <button
          className={exerciseCompletedButtonClassName}
          onClick={() => {
            props.handleExerciseCompletion(exercise, isCompleted);
          }}
        >
          {isCompleted ? 'completado' : 'completar'}
        </button>
      </div>
    </div>
  );
}
