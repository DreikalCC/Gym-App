import React from 'react';

export function TrainerExerciseCard(props) {
  return (
    <div className='element'>
      <div className='element__group'>
        <h3 className='element__location'>{props.data.exercise}</h3>
        <p className='element__description'>{props.data.description}</p>
        <button
          id='erase-btn'
          className='element__erase'
          onClick={() => {
            props.onEraseClick(props.data, props.user);
          }}
        ></button>
      </div>
    </div>
  );
}
