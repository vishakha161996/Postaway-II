import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who liked or disliked the post/comment
    postId: [{
        post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
        like: { type: Number, default: 0 },
        dislike: { type: Number, default: 0 }
    }], // Post ID if liked or disliked a post
    commentId: [{
        comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
        like: { type: Number, default: 0 },
        dislike: { type: Number, default: 0 }
    }]
})

export const LikeModel = mongoose.model('Like', likeSchema);