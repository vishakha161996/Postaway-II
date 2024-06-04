import express from "express";
import FriendController from "./friends.controller.js";
import { jwtAuth } from "../../middlewares/jwt-middleware.js";
import { auth } from "../../middlewares/auth.middleware.js";

const freindsRouter = express.Router();
const friendsController = new FriendController();

freindsRouter.use(jwtAuth);
freindsRouter.use(auth);

freindsRouter.get('/get-friends/:userId', (req, res) =>{
    friendsController.getFriends(req,res);
});

freindsRouter.get('/get-pending-requests', (req, res) =>{
    friendsController.getPendingRequests(req, res);
});

freindsRouter.post('/toggle-friendship/:friendId', (req, res) =>{
    friendsController.toggleFriendship(req, res);
});

freindsRouter.post('/response-to-request/:friendId', (req, res) =>{
    friendsController.respondToRequest(req, res);
});

export default freindsRouter;