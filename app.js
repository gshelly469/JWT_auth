const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

// const users = require('./routers/get_user');
const create_user = require('./routers/route')

const app = express();
app.use( express.json());

mongoose.connect(process.env.DB_connection, ()=>{ console.log('connected to DB')})


// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb+srv://girishscript:girishscript@sandbox.znzdm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("integer");
//   dbo.collection("hospital_pricemaster").find({}).limit(1).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// }); 



//Middleware
// app.use('/users', users)

app.use('/post_user', create_user)


// mongoose.connection.close()

//LISTENING PORT
app.listen(3000);