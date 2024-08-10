const Workout = require("../models/Workout");
  
  const list = async (req, res) => {
  // Implement the list functionality
  const workouts = await Workout.find();
  res.status(200).json({workouts:workouts});
  };
  
  const create = async (req, res) => {
  // Implement the create functionality
  const {name,Sets,Reps,Weight,Notes} = req.body;
  try{
      const doc = new Workout();
      doc.name = name;
      doc.Sets = Sets;
      doc.Reps = Reps;
      doc.Weight = Weight;
      doc.Notes = Notes;
      await doc.save();

      res.status(200).json({message:"Saved Succussfully"});
  }catch(err){
      res.status(400).json({message:err.message })
  }
  };
  
  const update = async (req, res) => {
  // Implement the update functionality
  };
  
  const delete_ = async (req, res) => {
  // Implement the delete functionality
  const id = req.params.id;
  try{
      const workout = await Workout.findOne({_id:id})
      res.status(200).json({workout:workout});
  }
  catch(err){
      res.status(400).json({message:err.message })
  }
  };
  
  const detail = async (req, res) => {
  // Implement the detail functionality
  };
  
  module.exports = {
  list, create, update, delete_, detail
  };
  