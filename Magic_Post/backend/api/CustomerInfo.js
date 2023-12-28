const express = require('express');
const CustomerInfo = require('../models/CustomerInfo');
const router = express.Router();

// Customer information needing support
router.post('/support', (req, res) => {
    let{fullname, email, phonenumber, mess} = req.body;
    email = email.trim();
    phonenumber = phonenumber.trim();
    // mess = mess.trim();

    if (fullname == "" || email == "" || phonenumber == "" || mess == "")
    {
        res.json({
            message: "Empty input fields!"
        });
    } 
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        res.json({
            message: "Invalid email entered!"
        })
    }
    else {
        CustomerInfo.find({email}).then(result => {

            if (result.length) {
                res.json({
                    message: "Customer with the provided email already exits!"
                })
            }
            else {
                const newForm = new CustomerInfo({
                    fullname,
                    email,
                    phonenumber,
                    mess,
                });
                newForm.save().then(result => {
                    res.json({
                        message: "Send Successful form support",
                        data: result,
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        message: "An error occurred while entered!"
                    })
                })
            }
        }).catch(err => console.log(err))
    }
})


router.get('/support', (req, res) => {
    CustomerInfo.find({}).then(result => {
        res.json(result)
    }).catch(err => console.log(err))
})
module.exports = router;