const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser");
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
    let m_id = req.body.movieId

    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({"movieId": m_id})
        .exec((err, info) => {
            if(err) return res.status(400).send(err)

            res.status(200).json({success: true, favoriteNumber: info.length})
        })
});

module.exports = router;