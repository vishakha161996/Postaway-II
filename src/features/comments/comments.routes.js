import express from "express";
import CommentController from "./comments.controller.js";
import { jwtAuth } from "../../middlewares/jwt-middleware.js";
import { auth } from "../../middlewares/auth.middleware.js";

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.use(jwtAuth);
commentRouter.use(auth);

commentRouter.post('/:postId',(req, res)=>{
    commentController.addComment(req, res);
})
commentRouter.get('/:postId',(req, res)=>{
    commentController.getCommentByPost(req, res)
});
commentRouter.put('/:commentId', (req, res)=>{
    commentController.updateComment(req, res);
})
commentRouter.delete('/:commentId',(req, res)=>{
    commentController.deleteComment(req, res);
})
export default commentRouter;