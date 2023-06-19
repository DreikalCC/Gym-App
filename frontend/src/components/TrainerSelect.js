import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function TrainerSelect(props) {
  console.log("trainer select props", props);
  const currentUser = useContext(CurrentUserContext);
  /*const isOwn = props.data.owner[0] === currentUser._id;
  const cardDeleteButtonClassName = `${
    isOwn ? "element__erase" : "element__erase_disabled"
  }`;*/
  const trainer = props.data;
  //const isSelected = trainer.likes.some((i) => i === currentUser._id);

  return (
    <div className="element">
      <div className="element__group">
        <h3 className="element__location">{trainer.name}</h3>
        <button
          className="element__like"
          onClick={() => {
            props.onCardLike(props.data);
          }}
        >
          Seleccionar
        </button>
      </div>
    </div>
  );
}
