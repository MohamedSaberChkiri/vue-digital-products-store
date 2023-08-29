const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cp = require('cookie-parser')
app = express()


async function startServer() {
    try {
      await mongoose.connect('mongodb+srv://digifyDB:1KjPBIiyc3NpWXZz@digifydb.ffzilst.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to the database');


      app.listen(3000)
      const routes = require('./routes/routes')
      app.use('/api', routes)

      app.use(cors({
        credentials : true, // this guy here named cors prevent a port error the browser causes and i set credentials to true so the cookies can be exchanged
        origin:['http://localhost:8080']
      }))

      app.use(cp())
   



    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }
  
  startServer();



