import express from "express";
import LikeController from "./likes.controller.js";
import { jwtAuth } from "../../middlewares/jwt-middleware.js";
import { auth } from "../../middlewares/auth.middleware.js";

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.use(jwtAuth);
likeRouter.use(auth);

likeRouter.post('/toggle/:commentId', (req, res) =>{
    likeController.toggleLike(req, res);
})
likeRouter.get('/:commentId', (req, res) => {
    likeController.getLike(req, res);
})
 export default likeRouter;