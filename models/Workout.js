const mongoose = require('mongoose');
  const { Schema } = mongoose;
  
  const WorkoutSchema = new Schema({
  name: String,
  Sets: Number,
  Reps: Number,
  Weight: Number,
  Notes: String,
  createdat: { type: Date, default: Date.now },
  });
  
  const Workout = mongoose.model('Workout', WorkoutSchema);
  
  module.exports = Workout;
  