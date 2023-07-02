export const dummyUser = [
  {
    name: 'user 1',
    _id: '007',
    email: 'test@test.com',
    password: '123',
    exercises: [
      {
        name: 'exercise 1',
        description: '3x12 bench press',
        _id: '00001',
        completed: [],
      },
      {
        name: 'exercise 2',
        description: '3x12 back press',
        _id: '00002',
        completed: ['007'],
      },
    ],
    role: 'trainee',
    trainer: [] /*[
      {
        name: 'Trainer 2',
        _id: 'T002',
        trainees: ['007'],
      },
    ]*/,
  },
  {
    name: 'user 2',
    _id: '006',
    email: 'test2@test.com',
    password: '123',
    exercises: [
      {
        name: 'exercise 1',
        description: '3x12 bench press',
        _id: '00001',
        completed: [],
      },
      {
        name: 'exercise 2',
        description: '4x12 back press',
        _id: '00002',
        completed: [],
      },
    ],
    role: 'trainee',
    trainer: [
      {
        name: 'Trainer 1',
        _id: 'T001',
        trainees: ['006'],
      },
    ],
  },
  {
    name: 'Trainer 1',
    _id: 'T001',
    email: 'test3@test.com',
    password: '123',
    role: 'trainer',
    trainees: ['006'],
  },
  {
    name: 'Trainer 2',
    _id: 'T002',
    email: 'test4@test.com',
    password: '123',
    role: 'trainer',
    trainees: ['007'],
  },
];
