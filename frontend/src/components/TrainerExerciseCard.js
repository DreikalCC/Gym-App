import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function TrainerExerciseCard(props) {
  props.temp(props.data);
  console.log('props on exercise card', props);
  const currentUser = useContext(CurrentUserContext);
  /*const isOwn = props.data.owner[0] === currentUser._id;
  const cardDeleteButtonClassName = `${
    isOwn ? "element__erase" : "element__erase_disabled"
  }`;
  const card = props.data;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__liked" : ""
  }`;
  */

  return (
    <div className='element'>
      <div className='element__group'>
        <h3 className='element__location'>{props.data.name}</h3>
        <p className='element__description'>{props.data.description}</p>
        <button
          id='erase-btn'
          className='element__erase'
          onClick={() => {
            props.onEraseClick(props.data);
          }}
        ></button>
      </div>
    </div>
  );
}
