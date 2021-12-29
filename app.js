const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

// const users = require('./routers/get_user');
const create_user = require('./routers/route')

const app = express();
app.use( express.json());

mongoose.connect(process.env.DB_connection, ()=>{ console.log('connected to DB')})





//Middleware
// app.use('/users', users)

app.use('/post_user', create_user)


// mongoose.connection.close()

//LISTENING PORT
app.listen(3000);