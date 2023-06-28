import React, { useEffect } from 'react';
import { useCallback } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Exercises } from './Exercises';
import { TrainerUsers } from './TrainerUsers';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { DeleteCardPopup } from './DeleteCardPopup';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from './Login';
import { Register } from './Register';
import { InfoTooltip } from './InfoTooltip';
import { Trainers } from './Trainers';
import { dummyUser } from '../utils/constants';

export default function App() {
  const navigate = useNavigate();
  React.useState(false);
  const [isEraseCardPopupOpen, setEraseCardPopupOpen] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isMenuOn, setIsMenuOn] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    description: '',
  });
  const [isTrainer, setIsTrainer] = React.useState(false);
  const [isTraineeeee, setIsTraineeee] = React.useState(false);
  const [hasTrainer, setHasTrainer] = React.useState(false);
  const [exercise, setExercise] = React.useState([]);
  const [routine, setRoutine] = React.useState([]);
  const [userList, setUserList] = React.useState([
    {
      name: 'user 1',
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
      trainer: [
        {
          name: 'Trainer 1',
          _id: 'T001',
        },
      ],
    },
    {
      name: 'user 2',
      _id: '006',
      exercises: [],
      trainer: [
        {
          name: 'Trainer 2',
          _id: 'T002',
        },
      ],
    },
    {
      name: 'user 3',
      _id: '005',
      exercises: [],
      trainer: [
        {
          name: 'Trainer 1',
          _id: 'T001',
        },
      ],
    },
  ]);

  const [trainerList, setTrainerList] = React.useState([
    {
      name: 'Trainer 1',
      _id: 'T001',
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
      _id: 'T002',
      trainees: [],
    },
  ]);

  const [currentUser, setCurrentUser] = React.useState({});
  const [deletableCard, setDeletableCard] = React.useState('');
  const [trainerCode, setTrainerCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userRole, setUserRole] = React.useState('');
  //const [userName, setUserName] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem('jwt'));
  /*const handleTokenCheckMemo = useCallback((token) => {
    if (!token) return;
    auth.checkToken(token).then((res) => {
      if (res.status === true) {
        setLoggedIn(true);
        navigate('/');
      }
    });
  }, []);
  React.useEffect(() => {
    if (!token) return;
    handleTokenCheckMemo(token);
    userPromise(token);
  }, [token]);*/

  /*function userPromise(token) {
    if (token) {
      Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
        .then(([user, serverCards]) => {
          setCurrentUser(user.data);
          getUserRole(user.data);
          setEmail(user.data.email);
          setRoutine(serverCards.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }*/
  ////card functions
  /*function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked, token).then((newCards) => {
      setCards((state) => {
        return state.map((c) => (c._id === card._id ? newCards.data : c));
      });
    });
  }*/

  function handleTrainerSelect(trainer) {
    trainer.trainees.push(currentUser);
    setHasTrainer(true);
    currentUser.trainer.push(trainer);
    navigate('/exercises');
    /*api
      .changeTrainerSelectedStatus(currentUser._id, token)
      .then(() => {
        api.setSelectedTrainer(trainer._id, token);
      })
      .then(() => {
        navigate('/exercises');
      });*/
  }

  function handleExerciseCompletion(exercise, isCompleted) {
    console.log(
      'exercise received by app after clicked',
      exercise,
      currentUser._id
    );
    const userId = currentUser._id;

    if (!isCompleted) {
      exercise.completed.push(userId);
    } else {
      exercise.completed.pop(userId);
    }
    console.log('new exercise completed data', exercise.completed);
    /*api
      .changeExerciseStatus(exercise._id, isCompleted, token)
      .then((newExercises) => {
        setRoutine((state) => {
          return state.map((c) =>
            c._id === exercise._id ? newExercises.data : c
          );
        });
      });*/
  }
  function handleEraseExercise(exercise) {
    console.log('exercise to be erased', exercise);
    console.log('exercise list', routine);

    /*api
      .deleteCard(exercise._id, token)
      .then(
        setRoutine((state) => {
          const remainingExercises = state.filter(
            (c) => c._id !== exercise._id
          );
          return remainingExercises.map((c) => c);
        })
      )
      .finally(closeAllPopups());*/
  }
  ////edition functions
  function handleEraseExerciseClick(card) {
    setDeletableCard(card);
    setEraseCardPopupOpen(true);
  }
  function handleMenuClick() {
    setIsMenuOn(true);
  }
  function closeAllPopups() {
    setEraseCardPopupOpen(false);
    setIsTooltipOpen(false);
    setSelectedCard({ name: '', link: '' });
  }
  ////updaters
  function handleAddExercise({ name, description, user }) {
    console.log('exercise to be added to the list', name, description);
    console.log('user that will receive the exercise', user);
    api.postCard(user, name, description, token).then((newExercise) => {
      setRoutine([newExercise.data, ...routine]);
    });
  }

  useEffect(() => {
    console.log('user setted', currentUser);
    checkForTrainer(currentUser.trainer);
    const roles = currentUser.role;
    if (roles === 'trainer') {
      console.log('was a trainer');
      setIsTrainer(true);
    }
    if (roles === 'trainee') {
      console.log('was a trainee');
      setIsTraineeee(true);
    }

    //getUserRole(currentUser.role);
    routing(currentUser.role);
    console.log('exercises pre--setted', currentUser.exercises);
    setRoutine(currentUser.exercises);
    console.log('exercises setted', routine);

    setEmail(email);
    console.log('mail setted', email);
    setLoggedIn(true);
    console.log('logged in setted', loggedIn);
  }, [currentUser]);

  ////registry
  function handleLoginSubmit({ email, password }) {
    console.log('log in submitted', email, password);

    setCurrentUser();

    /*auth
      .authorize(email, password)
      .then((data) => {
        setToken(data.token);
        setUserRole(data.user.role);
        setCurrentUser(data.user);
        setLoggedIn(true);
        setEmail(data.user.email);
        setUser
        if (userRole === 'trainee') {
          setIsTraineeee(true);
      navigate('/');
        }
        if (userRole === 'trainer') {
          setIsTrainer(true);
      navigate('/users');
        }
        userPromise();
      })
      .catch((err) => {
        console.log(err);
      });*/
  }
  function routing(user) {
    console.log('routing initiated');
    console.log('role setted trainer,trainee', isTrainer, isTraineeeee);
    setTimeout(() => {
      console.log(
        'routed executed, now redirecting',
        isTraineeeee,
        isTrainer,
        loggedIn
      );
      if (user === 'trainee') {
        console.log('knows is traineeeee');
        //checkForTrainer(currentUser.trainer);
        //setIsTraineeee(true);
        navigate('/trainers');
      }
      if (user === 'trainer') {
        console.log('knows is trainerrr');
        //setIsTrainer(true);
        navigate('/users');
      }
    }, 5000);
  }
  /*function routeLoggedUser(user) {
    console.log('routed executed, now redirecting', user);
    if (user === 'trainee') {
      console.log('knows is traineeeee');
      checkForTrainer(currentUser.trainer);
      setIsTraineeee(true);
      navigate('/trainers');
    }
    if (user === 'trainer') {
      console.log('knows is trainerrr');
      setIsTrainer(true);
      navigate('/users');
    }
  }*/
  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmail('');
    navigate('/login');
  }
  function handleSignupSubmit({ name, lastname, email, password, role }) {
    console.log(
      'data from registration',
      name,
      lastname,
      email,
      password,
      role
    );
    /*auth
      .register(name, lastname, email, password, role)
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
      });*/
  }
  function checkForTrainer(user) {
    console.log('will check for trainer', user);
    if (!user) {
      setHasTrainer(false);
    }
    setHasTrainer(true);
  }

  /*function getUserRole(user) {
    console.log('will check for the role', user);
    if (user === 'trainee') {
      setIsTraineeee(true);
      console.log('was a trainee');
    }
    if (user === 'trainer') {
      setIsTrainer(true);
      console.log('was a trainer');
    }
  }*/
  ////events handlers
  function handleExerciseChange(e) {
    setExercise(e.target.value);
  }
  function handleLastnameChange(e) {
    setLastname(e.target.value);
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handleTrainerCodeChange(e) {
    setTrainerCode(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function temp(data) {
    //setRoutine([data, ...routine]);

    console.log('loged exers', routine);
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
                loggedIn={isTraineeeee && !hasTrainer}
                element={
                  <Trainers
                    isTrainee={isTraineeeee}
                    isTrainer={isTrainer}
                    trainerList={trainerList}
                    trainerSelect={handleTrainerSelect}
                  />
                }
              />
            }
          />
          <Route
            path='/exercises'
            element={
              <ProtectedRoute
                loggedIn={isTraineeeee && hasTrainer}
                element={
                  <Exercises
                    isTrainee={isTraineeeee}
                    isTrainer={isTrainer}
                    exercises={routine}
                    handleExerciseCompletion={handleExerciseCompletion}
                  />
                }
              />
            }
          />
          <Route
            path='/users'
            element={
              <ProtectedRoute
                loggedIn={loggedIn && isTrainer}
                element={
                  <TrainerUsers
                    isTrainee={isTraineeeee}
                    isTrainer={isTrainer}
                    temp={temp}
                    userList={userList}
                    handleAddExercise={handleAddExercise}
                    handleEraseExerciseClick={handleEraseExerciseClick}
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
            element={
              <Register
                onNameChange={handleNameChange}
                onLastnameChange={handleLastnameChange}
                onEmailChange={handleEmailChange}
                onTrainerCodeChange={handleTrainerCodeChange}
                onPasswordChange={handlePasswordChange}
                onSignupSubmit={handleSignupSubmit}
              />
            }
          />
          <Route
            path='/'
            element={
              loggedIn && isTrainer ? (
                <Navigate to='/users' />
              ) : (
                <Navigate to='/trainers' />
              )
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
          onDeleteCard={handleEraseExercise}
          card={deletableCard}
          onConfirm={handleEraseExercise}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
