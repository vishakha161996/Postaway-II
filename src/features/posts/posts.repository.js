import { ObjectId } from "mongoose";
import { PostModel } from "./posts.schema.js";
import { UserModel } from "../users/user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class PostRepository{
    async createPost(data, email){
        try {
            const user = await UserModel.findOne({email: email});
            const userId = user._id;
            const newPost = new PostModel({
               caption: data.caption,
               imageUrl: data.imageUrl,
               userId: userId
            })
            await newPost.save();
            const postId = (await PostModel.findOne({ caption: data.caption }))._id;
            user.posts.push(postId);
            await user.save();
            return newPost;    
        } catch (error) {
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async getAllPosts(userId) {
        try {
            const result =  await PostModel.find({userId: userId}).populate({path: 'userId',
            select: 'username email'});
            return result;
        } catch (error) {
            throw new ApplicationError("Something went wrong while fetching posts", 500);
        }
    }
    async getPostById(postId) {
        try {
            const result = await PostModel.findById(postId).populate({path: 'userId',
            select: 'username email'});
            console.log("result", result)
            return result;
        } catch (error) {
            throw new ApplicationError("Something went wrong while fetching the post", 500);
        }
    }
    async getPostsByUserId(userId) {
        try {
            return await PostModel.find({ userId: userId }).populate({path: 'userId',
            select: 'username email'});
        } catch (error) {
            throw new ApplicationError("Something went wrong while fetching user's posts", 500);
        }
    }

    async deletePost(postId) {
        try {
            const post = await PostModel.findByIdAndDelete(postId);
            const userId = post.userId;
            const user = await UserModel.findById(userId);
            const postIndex = user.posts.indexOf(postId);
            if (postIndex !== -1) {
                user.posts.splice(postIndex, 1); // Remove the postId from the array
                await user.save(); // Save the user document
            }
            return post;
        } catch (error) {
            throw new ApplicationError("Something went wrong while deleting the post", 500);
        }
    }

    async updatePost(postId, newData) {
        try {
            // / Update the post and return the updated document
        const updatedPost = await PostModel.findByIdAndUpdate(postId, newData, { new: true });
        return updatedPost;
        } catch (error) {
            throw new ApplicationError("Something went wrong while updating the post", 500);
        }
    }

}