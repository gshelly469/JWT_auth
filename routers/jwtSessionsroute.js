const express = require('express');
const route = express.Router();
const jwt_route = require('../routers/jwtPrivateAuth') 

// const jwt = require('jsonwebtoken');

route.get('/hi', jwt_route,(req, res) =>{
    
    const dict = req.header('auth-token');
    console.log(req.user._id)

    // console.log(dict['auth-token'] ); 
    res.send('private route authenticated');
} )

module.exports = route