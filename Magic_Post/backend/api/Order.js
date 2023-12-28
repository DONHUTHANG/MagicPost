const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

  
//Get the list of all orders
router.get('/getall', (req, res) => {
    Order.find({})
    .then(data => res.json(data))
    .catch(err => res.status(500).json('Internal Server Error'))
})




module.exports = router;