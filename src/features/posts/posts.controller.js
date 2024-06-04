import PostRepository from "./posts.repository.js";

export default class PostController {
    constructor(){
        this.postRepository = new PostRepository();
        }

        async createPost(req, res) {
            try {
                const email = req.email;
                const newPost = await this.postRepository.createPost(req.body, email);
                res.status(201).send(newPost);
            } catch (error) {
                res.status(error.statusCode || 500).json({ error: error.message });
            }
        }
    
        async getAllPosts(req, res) {
            try {
                const userId = req.userId;
                const posts = await this.postRepository.getAllPosts(userId);
                // console.log("post", posts);
                res.status(200).json(posts);
            } catch (error) {
                res.status(error.statusCode || 500).json({ error: error.message });
            }
        }
    
        async getPostById(req, res) {
            try {
                const postId = req.params.postId;
                console.log("postId", postId)
                const post = await this.postRepository.getPostById(postId);
                res.status(200).json(post);
            } catch (error) {
                res.status(error.statusCode || 500).json({ error: error.message });
            }
        }
    
        async getPostsByUserId(req, res) {
            try {
                const userId = req.params.userId;
                const posts = await this.postRepository.getPostsByUserId(userId);
                res.status(200).json(posts);
            } catch (error) {
                res.status(error.statusCode || 500).json({ error: error.message });
            }
        }
    
        async deletePost(req, res) {
            try {
                const postId = req.params.postId;
                const deletedPost = await this.postRepository.deletePost(postId);
                res.status(200).json(deletedPost);
            } catch (error) {
                res.status(error.statusCode || 500).json({ error: error.message });
            }
        }
    
        async updatePost(req, res) {
            try {
                const postId = req.params.postId;
                const updatedPost = await this.postRepository.updatePost(postId, req.body);
                res.status(200).json(updatedPost);
            } catch (error) {
                res.status(error.statusCode || 500).json({ error: error.message });
            }
        }

}