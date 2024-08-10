
 const { faker } = require("@faker-js/faker");
const Workout = require("../models/Workout");
const dbconnect = require("../config/dbconnect");

dbconnect();

async function generateRandomWorkouts(numUsers) {
  try {
    const Workouts = [];
    for (var i = 0; i < numUsers; i++) {
      const Workout = {
       // Define your schema fields here
      };
      Workouts.push(Workout);
    }

    await Workout.insertMany(Workouts);
    console.log("Workout Seeder Run Successfully!");
  } catch (err) {
    console.log(err);
  }
}

generateRandomWorkouts(2);

// node seeders/WorkoutSeeder.js

  