import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function UserExerciseCard(props) {
  const currentUser = useContext(CurrentUserContext);
  const exercise = props.data;
  let isCompleted = exercise.completed.some((i) => i === currentUser._id);
  const exerciseCompletedClassName = `element ${
    isCompleted ? 'element_completed' : ''
  }`;
  const exerciseCompletedButtonClassName = `element__like ${
    isCompleted ? 'element__liked' : ''
  }`;

  return (
    <div className={exerciseCompletedClassName}>
      <div className='element__group element__group_user'>
        <h3 className='element__location'>{exercise.exercise}</h3>
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
