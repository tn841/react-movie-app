const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    writer: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type:Schema.Types.ObjectId,
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    contnet: {
        type: String
    }
}, {timestamps: true})


const Comment = mongoose.model('Commnet', CommentSchema);

module.exports = { Favorite: Comment }