import React, { useContext } from 'react';
//import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function TrainerSelect(props) {
  const trainer = props.data;

  return (
    <div className='element'>
      <div className='element__group'>
        <h3 className='element__location'>{trainer.name}</h3>
        <button
          className='element__like'
          onClick={() => {
            props.trainerSelect(props.data);
          }}
        >
          Seleccionar
        </button>
      </div>
    </div>
  );
}
