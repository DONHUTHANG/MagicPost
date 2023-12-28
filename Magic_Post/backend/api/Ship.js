const express = require('express');
const Ship = require('../models/Ship');
const router = express.Router();

router.get('/getShips', (req, res) => {
    Ship.find()
    .then(data => res.json(data))
    .catch(err => res.status(500).json('Internal Server Error'))
})


router.post('/getBySendId', (req, res) => {
    let send_id = req.body.send_id;
    // send_id = send_id.trim();
    console.log(send_id);
    if (send_id == "") {
        res.json({
            status: "FAILED",
            message: "Empty order information provided"
        })
    } else {
        Ship.find({send_id})
        .then(data => {
            if (data.length) {
                if (send_id === data[0].send_id) {
                    res.json(
                        {
                            status: "SUCCESS",
                            message: "Information Order",
                            data: data
                        }
                        )
                } else {
                    res.json({
                        status: "FAILED",
                        message: "Error order information provided"
                    })
                }
            } else {
                res.json({
                    status: "FAILED",
                    message: "Invalid order code entered!"
                })
            }
        })
        .catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing order code"
            })
        })
    }
})


module.exports = router;