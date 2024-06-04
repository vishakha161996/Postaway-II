import mongoose from "mongoose";
 const commentsSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
 })

 const CommentsModel = mongoose.model('Comment', commentsSchema);
 export default CommentsModel;