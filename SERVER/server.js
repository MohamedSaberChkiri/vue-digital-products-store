const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cp = require('cookie-parser');


async function startServer() {
  try {
    await mongoose.connect('mongodb+srv://digifyDB:1KjPBIiyc3NpWXZz@digifydb.ffzilst.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');

    // Use cors middleware before mounting routes
    const app = express();
    app.use(cors({
        credentials: true,
        origin : 'http://localhost:8080'
    }));
    

    // Use cookie-parser middleware
    app.use(cp());

    const routes = require('./routes/routes');
    app.use('/api', routes);

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

startServer();

