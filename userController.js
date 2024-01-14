const Username = require('./db_connect');
const mongoose = require('mongoose');

async function createUser(username) {
  try {
    const idObject=new mongoose.Types.ObjectId();
    const user = new Username({
      _id: idObject.toString(),
      username:username
    });
    await user.save();
    console.log('user created successfully:', user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Could not create the user in the Database');
  }
}


async function getAllUsers() {
  try {
    const users = await Username.find();
    console.log('All users retrieved successfully:', users);
    return users;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw new Error('Could not retrieve users from the Database');
  }
}


module.exports.createUser = createUser;
module.exports.getAllUsers = getAllUsers;