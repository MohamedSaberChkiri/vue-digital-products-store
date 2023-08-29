const express = require('express')
const mongoose = require('mongoose')
app = express()


async function startServer() {
    try {
      await mongoose.connect('mongodb+srv://digifyDB:1KjPBIiyc3NpWXZz@digifydb.ffzilst.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to the database');


      app.listen(3000)

      app.get('/',(req, res)=>{
          res.send('hello from node server')
      })


      
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }
  
  startServer();



