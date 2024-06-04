import CommentsModel from "./comments.schema.js";
import { UserModel } from "../users/user.schema.js";
import { PostModel } from "../posts/posts.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import mongoose, { ObjectId } from "mongoose";

export default class CommentsRepository{

    async addComment(postId, userId, text){
        try {
          const postExists = await PostModel.findById(postId);
    if (!postExists) {
        throw new ApplicationError('Post not found', 404);
    }

    const userExists = await UserModel.findById(userId);
    if (!userExists) {
        throw new ApplicationError('User not found', 404);
    }
    console.log("text",text.text);

    const comment = new CommentsModel({ 
        postId: new mongoose.Types.ObjectId(postId),
        userId: new mongoose.Types.ObjectId(userId), 
        text: text.text 
    });

    const commentId = comment._id;
    await comment.save();
    postExists.comments.push(commentId);
    userExists.comments.push(commentId);

    // Save the changes to both post and user
    await postExists.save();
    await userExists.save();

    return comment;
        } catch (error) {
          console.log("error",error)
            throw new ApplicationError('Something went wrong while adding a comment', 500);
        }
    }
     async getCommentByPost(postId){
        try {
            const result = await CommentsModel.find({ postId }).populate({path: 'userId',
            select: 'username email'});;
            console.log("resut", result);
            return result
        } catch (error) {
            throw new ApplicationError('Something went wrong while fetching comments', 500);

        }

     }
      async deleteComment(commentId){
        try {
            const comment = await CommentsModel.findByIdAndDelete(commentId);
            const postId = comment.postId;
            const userId = comment.userId;
            const user = await UserModel.findById(userId);
            const post = await PostModel.findById(postId);
            const commentIndexInPost = post.comments.indexOf(commentId);
            const commentIndex = user.comments.indexOf(commentId);
            if(commentIndex !== -1){
              user.comments.splice(commentIndex, 1);
              await user.save();
            }
            if(commentIndexInPost !== -1){
              post.comments.splice(commentIndexInPost, 1);
              await post.save();
            }
            return comment;
        } catch (error) {
            throw new ApplicationError('Something went wrong while deleting the comment', 500);

        }
      }
      async updateComment(commentId, newText){
             try {
                const update =  await CommentsModel.findByIdAndUpdate(commentId, { text: newText }, { new: true });
                return update;
             } catch (error) {
                throw new ApplicationError('Something went wrong while updating the comment', 500);

             }
      }
}