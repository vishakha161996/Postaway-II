import express from 'express'
import PostController from './posts.controller.js'; 
import { jwtAuth } from '../../middlewares/jwt-middleware.js';
import { auth } from '../../middlewares/auth.middleware.js';

const postRouter = express.Router();
const postController = new PostController();


postRouter.post('/', jwtAuth, auth,(req, res) =>{
    postController.createPost(req, res);
})

postRouter.get('/:postId', (req, res)=>{
    postController.getPostById(req, res);
})

postRouter.get('/', jwtAuth, auth,(req, res) =>{
    postController.getAllPosts(req, res);
})

postRouter.put('/:postId', jwtAuth, auth,(req, res) =>{
    postController.updatePost(req, res);
})

postRouter.delete('/:postId', jwtAuth, auth, (req, res)=>{
    postController.deletePost(req, res);
})

export default postRouter;
