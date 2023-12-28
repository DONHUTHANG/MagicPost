const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');

//Login with staff
router.post('/login', (req, res) => {
    let {username, password} = req.body;
    username = username.trim();
    password = password.trim();
    console.log(username);
    console.log(password);

    if (username == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty credentials supplied"
        })
    } else {
        User.find({username})
        .then(data => {
            if (data.length) {
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                  if (result) {
                    res.json({
                        status: "SUCCESS",
                        message: "Signin successful",
                        data: data
                    })
                  } else {
                    res.json({
                        status: "FAILED",
                        message: "Invalid password entered!"
                    })
                  }
                })
                .catch(error => {
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while comparing passwords"
                    })
                })

            } else {
                res.json({
                    status: "FAILED",
                    message: "Invalid credentials entered!"
                })
            }
        })
        .catch(error => {
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing user"
            })
        })
    }

})

//Get all users
router.get('/all/:user_id', async(req, res) => {
   try {
        User.findOne({user_id: req.params.user_id})
        .then(data => {
            res.json({
                status: 'SUCCESS',
                data: data
            })
        })
        .catch(err => console.err)
       
   }
   catch(err) {
    console.log(err);
    res.json({
        status: "FAILED",
        message: "An error occurred User ID."
    })
   }
})




module.exports = router;