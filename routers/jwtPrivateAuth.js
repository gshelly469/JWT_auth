const router = require('express').Router();

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('auth-token');
    // const token = req.header('auth-token');
    // console.log(token);
    if (!token) return res.status(401).send('No token');

    try{
        // res.send(token);
    
        const verify = jwt.verify(token, process.env.Secret_key_jwt);
        req.user = verify;
        console.log(verify); 
        next();
    }
    catch{
        return res.status(400).send('auth Failed');
        
    }
}