import React from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function GymRouter() {
  const currentUserContext = React.useContext(CurrentUserContext);
  let element = null;

  if (currentUserContext && currentUserContext.role === 'trainer') {
    element = <Navigate to='/users' />;
  } else if (currentUserContext.trainer.length === 0) {
    element = <Navigate to='/trainers' />;
  } else if (currentUserContext.trainer.length > 0) {
    element = <Navigate to='/exercises' />;
  } else {
    element = <Navigate to='login' />;
  }
  return element;
}
