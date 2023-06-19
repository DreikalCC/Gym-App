import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { TrainerExerciseCard } from "./TrainerExerciseCard";
import { Welcome } from "./Welcome";

export function TraineeCard(props) {
  //console.log("props in trainercard", props);
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.data.owner[0] === currentUser._id;
  const cardDeleteButtonClassName = `${
    isOwn ? "element__erase" : "element__erase_disabled"
  }`;
  const user = props.data;
  //console.log("user in card", user);

  return (
    <div className="element">
      <div className="element__group_user">
        <h3 className="element__location">{props.data.name}</h3>
        {!props.data.exercises || !props.data.exercises.length ? (
          <></>
        ) : (
          props.data.exercises.map((exercise) => {
            return (
              <TrainerExerciseCard
                key={exercise._id}
                data={exercise}
                handleAddExercise={props.handleAddExercise}
                userSelect={props.handleUserSelect}
                onEraseClick={props.handleEraseCardClick}
                handleExerciseCompletion={props.handleExerciseCompletion}
              />
            );
          })
        )}
        <form onSubmit={props.handleAddExercise} className="edit__form">
          <fieldset className="input">
            <label className="input__field">
              <input
                required
                id="exercise-name-input"
                name="exercise"
                onChange={props.onNameChange}
                type="text"
                placeholder="Ejercicio"
                className="input__form input__name input__name_gallery"
                minLength="2"
                maxLength="30"
              />
              <span className="input__form-error card-name-input-error"></span>
            </label>
            <label className="input__field">
              <input
                required
                id="description-input"
                name="description"
                onChange={props.onLinkChange}
                type="text"
                placeholder="Descripción"
                className="input__form input__description"
              />
              <span className="input__form-error card-url-input-error"></span>
            </label>
          </fieldset>
          <button type="submit" className="edit__submit-btn">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}
