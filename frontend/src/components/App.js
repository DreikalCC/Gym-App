import React from 'react';
import { useCallback } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Exercises } from './Exercises';
import { TrainerUsers } from './TrainerUsers';
import { ImagePopup } from './ImagePopup';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { DeleteCardPopup } from './DeleteCardPopup';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from './Login';
import { Register } from './Register';
import { InfoTooltip } from './InfoTooltip';
import { Trainers } from './Trainers';

export default function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEraseCardPopupOpen, setEraseCardPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isMenuOn, setIsMenuOn] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    description: '',
  });
  const [isTrainer, setIsTrainer] = React.useState(false);
  const [isTrainee, setIsTrainee] = React.useState(false);
  const [hasTrainer, setHasTrainer] = React.useState('');
  //const [exercises, setExercises] = React.useState([]);
  const [exercises, setExercises] = React.useState([
    {
      name: 'excercise 1',
      description: '3x12 bench press',
      likes: ['002', '003'],
      owner: '001',
      _id: '007',
    },
    {
      name: 'excercise2',
      description: '5 x 12 back press',
      likes: ['002'],
      owner: '001',
      _id: '006',
    },
  ]);
  const [userList, setUserList] = React.useState([
    {
      name: 'user 1',
      owner: '001',
      _id: '007',
      exercises: [
        {
          name: 'exercise 1',
          description: '3x12 bench press',
          _id: '0000001',
        },
        {
          name: 'exercise 2',
          description: '3x12 back press',
        },
      ],
      trainer: '001',
    },
    {
      name: 'user 2',
      owner: '002',
      _id: '006',
      exercises: [],
      trainer: '001',
    },
  ]);

  const [trainerList, setTrainerList] = React.useState([
    {
      name: 'Trainer 1',
      _id: '001',
      trainees: [
        {
          name: 'user 1',
          _id: '007',
        },
        {
          name: 'user 2',
          _id: '006',
        },
      ],
    },
    {
      name: 'Trainer 2',
      _id: '002',
      trainees: [],
    },
  ]);

  const [currentUser, setCurrentUser] = React.useState({
    name: 'user 1',
    owner: '001',
    _id: '007',
    exercises: [
      {
        name: 'exercise 1',
        description: '3x12 bench press',
        _id: '0000001',
      },
      {
        name: 'exercise 2',
        description: '3x12 back press',
        _id: '0000002',
      },
    ],
    trainer: 'trainer 1',
  });
  const [deletableCard, setDeletableCard] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [link, setLink] = React.useState('');
  const [userRole, setUserRole] = React.useState('');
  //const [userName, setUserName] = React.useState('');
  //const [lastname, setLastname] = React.useState('');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem('jwt'));
  const handleTokenCheckMemo = useCallback((token) => {
    if (!token) return;
    auth.checkToken(token).then((res) => {
      if (res.status === true) {
        setLoggedIn(true);
        navigate('/main');
      }
    });
  }, []);
  React.useEffect(() => {
    if (!token) return;
    handleTokenCheckMemo(token);
    userPromise(token);
  }, [token]);

  function userPromise(token) {
    if (token) {
      Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
        .then(([user, serverCards]) => {
          setCurrentUser(user.data);
          getUserRole(user.data);
          setEmail(user.data.email);
          setExercises(serverCards.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  ////card functions
  /*function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked, token).then((newCards) => {
      setCards((state) => {
        return state.map((c) => (c._id === card._id ? newCards.data : c));
      });
    });
  }*/

  function handleExerciseCompletion(exercise) {
    const isCompleted = exercise.likes.some((i) => i === currentUser._id);
    api
      .changeLikeExeStatus(exercise._id, isCompleted, token)
      .then((newExercises) => {
        setExercises((state) => {
          return state.map((c) =>
            c._id === exercise._id ? newExercises.data : c
          );
        });
      });
  }
  function handleCardDelete(exercise) {
    api
      .deleteCard(exercise._id, token)
      .then(
        setExercises((state) => {
          const remainingExercises = state.filter(
            (c) => c._id !== exercise._id
          );
          return remainingExercises.map((c) => c);
        })
      )
      .finally(closeAllPopups());
  }
  function handleCardClick(e) {
    setSelectedCard({ name: e.target.alt, link: e.target.src });
    setIsImagePopupOpen(true);
  }
  ////edition functions
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEraseCardClick(card) {
    setDeletableCard(card);
    setEraseCardPopupOpen(true);
  }
  function handleMenuClick() {
    setIsMenuOn(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setEraseCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsTooltipOpen(false);
    setIsMenuOn(false);
    setSelectedCard({ name: '', link: '' });
  }
  ////updaters
  function handleUpdateUser({ name, about }) {
    api
      .postUserInfo(name, about, token)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .finally(closeAllPopups());
  }
  function handleUpdateAvatar({ avatar }) {
    api
      .postUserAvatar(avatar, token)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .finally(closeAllPopups());
  }
  function handleAddExercise({ name, description }) {
    api
      .postCard(name, description, token)
      .then((newExercise) => {
        setExercises([newExercise.data, ...exercises]);
      })
      .finally(closeAllPopups());
  }
  ////registry
  function handleLoginSubmit({ email, password }) {
    auth
      .authorize(email, password)
      .then((data) => {
        setToken(data.token);
        setUserRole(data.user.role);
        setCurrentUser(data.user.name);
        setLoggedIn(true);
        setEmail(data.user.email);
        if (userRole === trainee) {
          navigate('/');
        }
        if (userRole === trainer) {
          navigate('/users');
        }
        userPromise();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmail('');
    navigate('/login');
  }
  function handleSignupSubmit({ name, lastname, email, password, role }) {
    auth
      .register(name, lastname, email, password)
      .then((res) => {
        navigate('/login');
      })
      .then(() => {
        setSuccess(true);
        setIsTooltipOpen(true);
      })
      .catch((err) => {
        setSuccess(false);
        setIsTooltipOpen(true);
        console.log(err);
      });
  }
  function getUserRole(user) {
    if (user.role === trainee) {
      setIsTrainee(true);
      if(!user.trainer){
        setHasTrainer(false);
      }
      setHasTrainer(true);
    }
    if (user.role === trainer) {
      setIsTrainer(true);
    }
  }

  ////events handlers
  function handleLocationChange(e) {
    setLocation(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          isOpen={isMenuOn}
          onClose={closeAllPopups}
          handleMenuClick={handleMenuClick}
          handleLogoutClick={handleLogout}
          loggedIn={loggedIn}
          email={email}
        />
        <Routes>
          <Route
            path='/trainers'
            element={
              <ProtectedRoute
                loggedIn={isTrainee&&!hasTrainer}
                element={
                  <Trainers
                    trainerList={trainerList}
                    handleExerciseCompletion={handleExerciseCompletion}
                    handleCardClick={handleCardClick}
                    handleEditAvatarClick={handleEditAvatarClick}
                    handleEditProfileClick={handleEditProfileClick}
                    handleAddPlaceClick={handleAddPlaceClick}
                    handleEraseCardClick={handleEraseCardClick}
                  />
                }
              />
            }
          />
          <Route
            path='/exercises'
            element={
              <ProtectedRoute
                loggedIn={isTrainee&&hasTrainer}
                element={
                  <Exercises
                    exercises={exercises}
                    handleExerciseCompletion={handleExerciseCompletion}
                    handleCardClick={handleCardClick}
                    handleEditAvatarClick={handleEditAvatarClick}
                    handleEditProfileClick={handleEditProfileClick}
                    handleAddPlaceClick={handleAddPlaceClick}
                    handleEraseCardClick={handleEraseCardClick}
                  />
                }
              />
            }
          />
          <Route
            path='/users'
            element={
              <ProtectedRoute
                loggedIn={loggedIn&&isTrainer}
                element={
                  <TrainerUsers
                    userList={userList}
                    handleAddExercise={handleAddExercise}
                    handleCardClick={handleCardClick}
                    handleEditAvatarClick={handleEditAvatarClick}
                    handleEditProfileClick={handleEditProfileClick}
                    handleAddPlaceClick={handleAddPlaceClick}
                    handleEraseCardClick={handleEraseCardClick}
                  />
                }
              />
            }
          />
          <Route
            path='/login'
            element={<Login onLoginSubmit={handleLoginSubmit} />}
          />

          <Route
            path='/signup'
            element={<Register onSignupSubmit={handleSignupSubmit} />}
          />
          <Route
            path='/'
            element={
              loggedIn ? <Navigate to='/exercises' /> : <Navigate to='/login' />
            }
          />
        </Routes>
        <InfoTooltip
          isTooltipOpen={isTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={success}
        />
        <DeleteCardPopup
          isOpen={isEraseCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={deletableCard}
          onConfirm={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
