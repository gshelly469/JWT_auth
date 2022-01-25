// const { request } = require('express');
const express = require('express');
const rout = express.Router();
const enc = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const Sub = require('../Model/post_schema');
const mongodb = require('mongodb');
// require('dotenv/config')


// mongoose.connect(process.env.DB_connection, ()=> {console.log('connected to the mongo for post')})


// rout.use('/addTheData', express.json());
rout.post('/addTheData' ,async (req, res) =>{

    // Creating of password with salt
    const salt_pass = await enc.genSalt(10);
    const hashPass = await enc.hash(req.body.password, salt_pass);


    console.log(req.body);

    const data_user = new Sub({
        name_str : req.body.name,
        mno : req.body.mnumber,
        pass : hashPass
    });

    data_user.save().then( data => {
        res.send(data);
    })
    .catch(err =>{
        res.json({message:err});
    })

});

rout.post('/login', async (req, res) =>{

    const user = await Sub.findOne({'name_str':req.body.name});
    if (!user) return res.status(400).send('Username not found');
    
    const pass = await enc.compare(req.body.password, user.pass);
    console.log(pass);
    if (!pass) return res.send('password incorrect');

    const signed_token = jwt.sign({'_id':user._id },process.env.Secret_key_jwt )
    
    // return res.send(signed_token);
    return res.header('auth-token', signed_token).send(signed_token);
   
})

rout.get('/' , async (req, res) =>{
    // res.send('POST USERS')
    console.log('HI', req.id);
    try{
        const sub = await Sub.find({'_id':'61c5a43fc721a2612cbb7982'})
        res.send(sub)
    }
    catch(err) {
        res.send({message:err.message});
    }
    // res.send('received');
});

// below route will always create a new connection string every time api is called 
rout.get('/test', async (req, res)=>{
    console.log('in the test route');
    const MongoClient = require("mongodb").MongoClient;
    const url = 'mongodb+srv://girishscript:girishscript@sandbox.znzdm.mongodb.net/school?retryWrites=true&w=majority';
    // const client = new mongodb.MongoClient('mongodb+srv://girishscript:girishscript@sandbox.znzdm.mongodb.net/school?retryWrites=true&w=majority');
    // mongo.connect(url, (err, client) => {
    // if (err) {
    //     console.log('in the error of test');
    //     console.error(err);
    //     return;
    // }
    // console.log('Connected successfully to server');
    // const db = client.db('school');
    // })
    const mongo = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongo.connect(err => {
        console.log("MongoDB connected for Beyblade.js");
        const db = mongo.db('school');
        const collection = db.collection('alldata');
        const data_pm = collection.find({"Pkg UOM":"Numbers"}).toArray((error, items) => {
        console.log(items);
        // return res.send(data_pm);
        })
    });
    return res.send("some problem");
   
        // getData(collection, req, res)
})


// mongoose.connection.close();
module.exports = rout;