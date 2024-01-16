const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const db = process.env.MONGO_URI

mongoose.connect(db);

const exerciseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
    type: Number,
    required: true
    }, 
    date: String
});

const userSchema = new mongoose.Schema({
    _id: {
      type: mongoose.ObjectId,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    count: Number,
    exercises:[exerciseSchema],
  });


const Username = mongoose.model('Username', userSchema);

module.exports = Username;