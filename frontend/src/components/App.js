import React, { useEffect, useId } from 'react';
//import { useCallback } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Exercises } from './Exercises';
import { TrainerUsers } from './TrainerUsers';
//import api from '../utils/api';
//import * as auth from '../utils/auth';
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
  const [routine, setRoutine] = React.useState([]);
  const [userList, setUserList] = React.useState([
    {
      name: 'user 1',
      _id: '007',
      exercises: [
        {
          exercise: 'exercise 1',
          description: '3x12 bench press',
          _id: '0000001',
        },
        {
          exercise: 'exercise 2',
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

  const trainerList = [
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
  ];

  const [currentUser, setCurrentUser] = React.useState({});
  const [deletableCard, setDeletableCard] = React.useState('');
  //const [trainerCode, setTrainerCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userIdExercise, setUserIdExercise] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [name, setName] = React.useState('');
  const [exercise, setExercise] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  //const [token, setToken] = React.useState(localStorage.getItem('jwt'));
  //let randomId = useId();
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

  function handleTrainerSelect(trainer) {
    trainer.trainees.push(currentUser);
    currentUser.trainer.push(trainer);
    setTimeout(() => {
      navigate('/exercises');
    }, 100);

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
    const userId = currentUser._id;

    if (!isCompleted) {
      exercise.completed.push(userId);
      const update = routine.map((c) =>
        c._id === exercise._id ? exercise : c
      );
      setRoutine(update);
    } else {
      exercise.completed.pop(userId);
      const update = routine.map((c) =>
        c._id === exercise._id ? exercise : c
      );
      setRoutine(update);
    }
    //setRoutine();
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
  function handleAddExercise({ exercise, description, id }) {
    const receiver = userList.find((person) => {
      return person._id === id;
    });
    receiver.exercises.push({
      exercise,
      description,
      _id: () => {
        useId();
      },
    });
    const updatedList = userList.map((u) => (u._id === id ? receiver : u));
    setUserList(updatedList);
    /*api.postCard(user, name, description, token).then((newExercise) => {
      setRoutine([newExercise.data, ...routine]);
    });*/
  }

  function handleEraseExercise(exercise, selectedUser) {
    selectedUser.exercises = selectedUser.exercises.filter(
      (exe) => exe._id !== exercise._id
    );

    const updatedList = userList.map((u) =>
      u._id === selectedUser._id ? selectedUser : u
    );
    setUserList(updatedList);
    closeAllPopups();

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
  function handleEraseExerciseClick(card, id) {
    setDeletableCard(card);
    setUserIdExercise(id);

    setEraseCardPopupOpen(true);
  }

  function handleMenuClick() {
    setIsMenuOn(true);
  }
  function closeAllPopups() {
    setEraseCardPopupOpen(false);
    setIsTooltipOpen(false);
    setDeletableCard('');
    setUserIdExercise('');
  }
  function routing(user) {
    setTimeout(() => {
      if (user === 'trainee') {
        if (currentUser.trainer.length === 0) {
          navigate('/trainers');
        }
        if (currentUser.trainer.length > 0) {
          navigate('/exercises');
        }
      }
      if (user === 'trainer') {
        navigate('/users');
      }
    }, 100);
  }
  useEffect(() => {
    const saveData = localStorage.getItem('jwt');
    if (saveData) {
      const user = JSON.parse(saveData);
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (!currentUser || !currentUser._id) {
      return;
    }
    localStorage.setItem('jwt', JSON.stringify(currentUser));
    routing(currentUser.role);
    setRoutine(currentUser.exercises);
    setEmail(currentUser.email);
    setLoggedIn(true);
  }, [currentUser]);

  ////registry

  function handleLoginSubmit({ email, password }) {
    const loggedUser = dummyUser.find((person) => {
      return person.email === email;
    });
    if (!loggedUser) {
      alert('Usuario invalido');
      setSuccess(false);
      return;
    }
    checkPassword(loggedUser, password);
    //setSuccess(true);
    //setCurrentUser(loggedUser);

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
  function checkPassword(loggedUser, password) {
    if (loggedUser.password === password) {
      setSuccess(true);
      setCurrentUser(loggedUser);
    } else {
      setSuccess(false);
      return;
    }
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmail('');
    setCurrentUser('');
    navigate('/login');
  }
  function handleSignupSubmit({ name, lastname, email, password, role }) {
    if (role === 'trainee') {
      userList.push({
        name,
        lastname,
        email,
        password,
        role,
        _id: () => {
          useId();
        },
        exercises: [],
        trainer: [],
      });
      dummyUser.push({
        name,
        lastname,
        email,
        password,
        role,
        _id: () => {
          useId();
        },
        exercises: [],
        trainer: [],
      });
    }
    if (role === 'trainer') {
      trainerList.push({
        name,
        lastname,
        email,
        password,
        role,
        _id: () => {
          useId();
        },
        trainees: [],
      });
      dummyUser.push({
        name,
        lastname,
        email,
        password,
        role,
        _id: () => {
          useId();
        },
        trainees: [],
      });
    }
    navigate('/login');
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
  function handlePasswordChange(e) {
    setPassword(e.target.value);
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
                loggedIn={
                  currentUser.role === 'trainee' &&
                  currentUser.trainer.length === 0
                }
                element={
                  <Trainers
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
                loggedIn={
                  currentUser.role === 'trainee' &&
                  currentUser.trainer.length > 0
                }
                element={
                  <Exercises
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
                loggedIn={loggedIn && currentUser.role === 'trainer'}
                element={
                  <TrainerUsers
                    userList={userList}
                    handleAddExercise={handleAddExercise}
                    handleEraseExerciseClick={handleEraseExerciseClick}
                    onDescriptionChange={handleDescriptionChange}
                    onExerciseChange={handleExerciseChange}
                    exercise={exercise}
                    description={description}
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
                onPasswordChange={handlePasswordChange}
                onSignupSubmit={handleSignupSubmit}
                name={name}
                lastname={lastname}
                email={email}
                password={password}
              />
            }
          />
          <Route
            path='/'
            element={
              loggedIn && currentUser.role === 'trainer' ? (
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
          card={deletableCard}
          selectedUser={userIdExercise}
          onConfirm={handleEraseExercise}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
