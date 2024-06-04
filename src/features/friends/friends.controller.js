import FriendRepository from "./friends.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class FriendController{
    constructor(){
        this.friendRepository = new FriendRepository();
    }

    async getFriends(req, res){
        try {
            const userId = req.params.userId;
            const friends = await this.friendRepository.getFriends(userId);
            res.status(200).send(friends);
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Failed to get freinds",500)
        }

    }

    async getPendingRequests(req, res){
      try {
        const userId = req.userId;
        const pendingRequests = await this.friendRepository.getPendingRequests(userId);
        res.status(200).send(pendingRequests);
      } catch (error) {
        throw new ApplicationError("failed to get", 500);
      }
    }
    
    async toggleFriendship (req, res){
        try {
            const friendId = req.params.friendId;
            const userId = req.userId;
            // console.log("frId",friendId)
            // console.log("userId",userId);
            await this.friendRepository.toggleFriendship(userId, friendId);
            res.status(200).json({ message: 'Friendship status toggled successfully' });
        } catch (error) {
            throw new ApplicationError("Failed to toggle friendship status",500);
        }
    }
     async respondToRequest( req, res){
        try {
            const friendId = req.params.friendId;
            const response = req.body.response;
            const userId = req.userId
            await this.friendRepository.respondToRequest(userId,friendId, response);
            res.status(200).json({ message: 'Friend request responded successfully' });
        } catch (error) {
            throw new ApplicationError("Failed to respond to friend request", 500);
            
        }
     }
}