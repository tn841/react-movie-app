const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser");
const { Comment } = require('../models/Comment');

router.post('/saveComment', (req, res) => {
    const comment = new Comment(req.body)
    comment.save((err, doc)=>{
        if(err) return res.json({success:false, err})
        
        Comment.find({'_id': comment._id})
        .populate('writer') //commnet와 해당 comment 작성자 정보를 join
        .exec((err, data) => {
            if(err) return res.json({success:false, err})

            return res.status(200).json({success:true, data})
        })
    })
});

router.post('/getComment', (req, res) => {
    Comment.find({"postId": req.body.postId})
    .populate("writer")
    .exec( (err, doc) => {
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success: true, doc})
    })
});

module.exports = router;