const express = require('express');
const Depot = require('../models/Depot');
const router = express.Router();


router.get('/getall/:depot_code', async (req, res) => {
    try {
        Depot.findOne({depot_code: req.params.depot_code})
        .then(data => res.json({
            status: 'SUCCESS',
            data: data,
        }))
        .catch(err => console.log(err))
   }
   catch(err) {
    console.log(err);
   }
});


module.exports = router;