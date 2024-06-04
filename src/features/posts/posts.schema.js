import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }]
})

export const PostModel = mongoose.model('Post',postSchema);