const {createUser, getAllUsers} = require('./userController');

const express = require('express');


const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.send('Hello, this is the home page!');
});

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
    
        const user = await createUser(username);
    
        res.status(201).json(user);
      } catch (error) {
        console.error('Error handling POST request:', error);
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
