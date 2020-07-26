const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    writer: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: String,
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }
}, {timestamps: true})


const Comment = mongoose.model('Commnet', CommentSchema);

module.exports = { Comment }