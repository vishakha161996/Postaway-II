import { LikeModel } from "./likes.schema.js";
import { PostModel } from "../posts/posts.schema.js";
import { UserModel } from "../users/user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class LikeRepository{
    async toggleLike(userId, postId, commentId){
       try {
        let like = await LikeModel.findOne({ userId });

        // If userId not present, create a new like entry
        if (!like) {
            like = new LikeModel({ userId });
        }

        // Check if postId or commentId is provided
        if (postId) {
            const index = like.postId.findIndex(item => item.post.toString() == postId.toString());
            if (index == -1) {
                like.postId.push({ post: postId, like: 1, dislike: 0 });
                const post = await PostModel.findById(postId);
                post.likes.push(like._id);
                await post.save();
            } else {
                // Toggle like/dislike status for postId
                if (like.postId[index].like === 1) {
                    like.postId[index].like = 0;
                    like.postId[index].dislike = -1;
                } else {
                    like.postId[index].like = 1;
                    like.postId[index].dislike = 0;
                }
            }
        }if (commentId) {
            const index = like.commentId.findIndex(item => item.comment.toString() == commentId.toString());
            if (index === -1) {
                like.commentId.push({ comment: commentId, like: 1, dislike: 0 });
            } else {
                // Toggle like/dislike status for commentId
                if (like.commentId[index].like === 1) {
                    like.commentId[index].like = 0;
                    like.commentId[index].dislike = -1;
                } else {
                    like.commentId[index].like = 1;
                    like.commentId[index].dislike = 0;
                }
            }
        }

        // Save the updated like document
        await like.save();

        return like;
    } catch (error) {
        throw new ApplicationError("Failed to toggle like/dislike.", 500)
        
       }
    }
    async getLikes(postId, commentId){
        try {
            let likes;
            if (postId) {
                likes = await LikeModel.find({ "postId.post": postId });
            } else if (commentId) {
                likes = await LikeModel.find({ "commentId.comment": commentId });
            } else {
                throw new ApplicationError("Either postId or commentId is required.", 400);
            }
            return likes;
        } catch (error) {

            throw new ApplicationError("Failed to get likes.", 500);
            
        }
        
    }
}