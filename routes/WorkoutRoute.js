
  const express = require('express');
  const { list, create, update, delete_, detail } = require('../controllers/WorkoutController');
  
  const WorkoutRouter = express.Router();
  
  WorkoutRouter.get('', list);
  WorkoutRouter.post('/create', create);
  WorkoutRouter.put('/edit/:id', update);
  WorkoutRouter.delete('/delete/:id', delete_);
  WorkoutRouter.get('/:id', detail);
  
  module.exports = WorkoutRouter;
  