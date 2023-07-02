import React from 'react';
import { PopupWithForm } from './PopupWithForm';

export function DeleteCardPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onConfirm(props.card, props.selectedUser);
  }
  return (
    <PopupWithForm
      name='eraser'
      title='¿Estás seguro?'
      buttonText='Si'
      onSubmit={handleSubmit}
      isPopupOpen={props.isOpen}
      onClose={props.onClose}
    ></PopupWithForm>
  );
}
