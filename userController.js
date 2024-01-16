const Username = require('./db_connect');
const mongoose = require('mongoose');

async function createUser(username) {
  try {
    const idObject=new mongoose.Types.ObjectId();
    const user = new Username({
      _id: idObject,
      username:username,
      count: 0,
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

      if(!date) {
        date = new Date().toDateString();
      } else {
        date = new Date(date).toDateString();
      }
  
      const exercise = {
        description,
        duration,
        date: date
      };
  
      user.exercises.push(exercise);
      user.count =user.exercises.length;
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

async function getAllLogs(_id,from,to,limit) {
  try {
    const user = await Username.findById(_id);
  
      if (!user) {
        return null;
      }

      let { username, exercises, count } = user;
      


      // Apply optional date filters
      if (from || to) {
        exercises = exercises.filter((exercise) => {
          const exerciseDate = new Date(exercise.date);
          return (
            (!from || exerciseDate >= new Date(from)) &&
            (!to || exerciseDate <= new Date(to))
          );
        });
      }

      // Apply optional limit
    if (limit) {
      exercises = exercises.slice(0, limit);
    }

    const logsOfUser = {
      username,
      count,
      _id,
      log: exercises,
    };

    console.log('All logs retrieved successfully:', logsOfUser);
    return logsOfUser;
  } catch (error) {
    console.error('Error retrieving logs:', error);
    throw new Error('Could not retrieve logs from the Database');
  }
}


module.exports.createUser = createUser;
module.exports.getAllUsers = getAllUsers;
module.exports.createExercise = createExercise;
module.exports.getAllLogs = getAllLogs;