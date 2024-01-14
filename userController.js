const Username = require('./db_connect');
const mongoose = require('mongoose');

async function createUser(username) {
  try {
    const idObject=new mongoose.Types.ObjectId();
    const user = new Username({
      _id: idObject,
      username:username,
      exercises: [],
    });
    await user.save();
    console.log('user created successfully:', {_id:user._id.toString() , username: user.username});
    return {_id:user._id.toString() , username: user.username};
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Could not create the user in the Database');
  }
}


async function getAllUsers() {
  try {
    const users = await Username.find().select("username");
    console.log('All users retrieved successfully:', users);
    return users;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw new Error('Could not retrieve users from the Database');
  }
}

async function createExercise(_id,description,duration,date) {
  try {
    const user = await Username.findById(_id);
  
      if (!user) {
        return null;
      }
  
      const exercise = {
        description,
        duration,
        date: date || new Date(),
      };
  
      user.exercises.push(exercise);
      await user.save();

      const created_exercise= {
        username: user.username,
        ...exercise,
        _id: user._id.toString(),
      }

      console.log('Exercise created successfully:', created_exercise);

      return created_exercise;  
  } catch (error) {
    console.error('Error creating exercise:', error);
    throw new Error('Could not create new exercise to the Database');
  }
}


module.exports.createUser = createUser;
module.exports.getAllUsers = getAllUsers;
module.exports.createExercise = createExercise;