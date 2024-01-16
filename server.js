const {createUser, getAllUsers, createExercise, getAllLogs} = require('./userController');
const {isValidDateFormat, isValidUsername} = require('./helpers')


const express = require('express');


const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.send('Hello, this is the home page!');
});

// Route to handle GET request to retrieve all users
app.get('/api/users', async (req,res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
      } catch (error) {
        console.error('Error handling GET request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

// Route to handle POST request for creating a new user
app.post('/api/users', async (req, res) => {
    try {
        const { username } = req.body;
    
        if (!username) {
          return res.status(400).json({ error: 'Username is required' });
        }

        if(!isValidUsername(username)) {
          return res.status(400).json({ error: 'Username is not in right format' });
        } 
    
        const user = await createUser(username);
    
        res.status(201).json(user);
      } catch (error) {
        console.error('Error handling POST request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });


// Route to handle POST request for creating a new exercise for a user
app.post('/api/users/:_id/exercises', async (req, res) => {
    try {
      const { _id } = req.params;
      const { description, duration, date } = req.body;
  
      if (!description || !duration) {
        return res.status(400).json({ error: 'Description and duration are required' });
      }

      if(date) {
        if(!isValidDateFormat(date))
          return res.status(404).json({ error: 'Date is not in a right format should be (yyyy-mm-dd)' });
      }

      const created_exercise = await createExercise(_id,description,duration,date);

      if (!created_exercise) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(created_exercise);
    } catch (error) {
      console.error('Error handling POST request for exercises:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Route to handle GET request to retrieve user logs with optional filters
  app.get('/api/users/:_id/logs', async (req,res) => {
    try {
        const { _id } = req.params;
        const { from, to, limit } = req.query;

        if(from) {
          if(!isValidDateFormat(from))
            return res.status(404).json({ error: 'From Date is not in a right format should be (yyyy-mm-dd)' });
        }

        if(to) {
          if(!isValidDateFormat(to))
            return res.status(404).json({ error: 'To Date is not in a right format should be (yyyy-mm-dd)' });
        }

        const user_logs = await getAllLogs(_id,from,to,limit);

        if(!user_logs) {
          return res.status(404).json({ error: 'User not found' });
        }


        res.status(200).json(user_logs);
      } catch (error) {
        console.error('Error handling GET request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 - Internal Server Error');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running`);
});
