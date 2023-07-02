import React, { useContext } from 'react';
import { TrainerSelect } from './TrainerSelect';
import { Welcome } from './Welcome';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Trainers(props) {
  const currentUserContext = useContext(CurrentUserContext);
  return (
    <>
      <section className='profile'>
        <div className='profile__info'>
          <h1 className='profile__name'>Hola, selecciona a tu entrenador</h1>
        </div>
      </section>

      <section className='elements'>
        {!props.trainerList || !props.trainerList.length ? (
          <Welcome />
        ) : (
          props.trainerList.map((trainer) => {
            return (
              <TrainerSelect
                key={trainer._id}
                data={trainer}
                trainerSelect={props.trainerSelect}
              />
            );
          })
        )}
      </section>
    </>
  );
}
