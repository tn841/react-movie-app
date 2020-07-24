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

router.post('/favorited', (req, res) => {
    let m_id = req.body.movieId
    let user_id = req.body.userFrom

    // mongoDB에서 내가 favorite 했는지 확인
    Favorite.find({"movieId": m_id, 'userFrom': user_id})
        .exec((err, info) => {
            console.log(info);
            if(err) return res.status(400).send(err)
            
            let result = false;

            if(info.length > 0){
                result = true
            }
            res.status(200).json({success: true, favorited: result})
            
        })
});

router.post('/add', (req, res) => {
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
            doc
        });
    });
})

router.post('/remove', (req, res) => {
    Favorite.findOneAndDelete({"movieId": req.body.movieId, 'userFrom': req.body.userFrom})
    .exec((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true, doc})
    })
})

module.exports = router;