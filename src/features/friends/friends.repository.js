import { FriendshipModel } from "./friends.schema.js";
import { UserModel } from "../users/user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class FriendRepository {
    async getFriends(userId) {
        try {
           // Find the friendship document for the specified userId
        const friendship = await FriendshipModel.findOne({ userId: userId });
        if (!friendship) {
            throw new Error("Friendship not found");
        }

        // Get the array of friend IDs from the friendship document
        const friendIds = friendship.friends.map(friend => friend.id);

        // Find the corresponding usernames from the UserModel
        const friends = await UserModel.find({ _id: { $in: friendIds } }).select('username');

        return friends;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("something Went Wrong", 300);
        }
    }
    async getPendingRequests(userId) {
        try {
            console.log("userUd", userId)
            const friendships = await FriendshipModel.find({ userId: userId });
            console.log("fri", friendships);
        // Extract friend IDs from the found friendships
        const friendIds = friendships.reduce((acc, friendship) => {
            acc.push(...friendship.friends.filter(friend => friend.status == 'pending').map(friend => friend.id));
            return acc;
        }, []);

        // Find user documents corresponding to the friend IDs
        const friends = await UserModel.find({ _id: { $in: friendIds } }).select('username');

        return friends;

        } catch (error) {
            console.log(error);
            throw new ApplicationError("something Went Wrong", 300);
        }

    }
    async toggleFriendship(userId, friendId) {
        try {
            const existingUser = await FriendshipModel.findOne({userId: userId});
            if(existingUser){
                const friendIndex = existingUser.friends.findIndex(f => f.id.toString() == friendId.toString());
                 if(friendIndex!==-1){
                       existingUser.friends[friendIndex].status = (existingUser.friends[friendIndex].status == 'pending') ? 'accepted' : 'pending';
                       await existingUser.save();
                       const loginUser = await UserModel.findOne({_id: userId});
                    //    console.log("loginUser",loginUser)

                       loginUser.friends.push(friendId);
                    //    console.log("loginUser",loginUser)
                       await loginUser.save();
                    //    console.log("index", existingUser.friends[friendIndex].id)
                       const friendUser = await UserModel.findOne({_id:existingUser.friends[friendIndex].id });
                    //    console.log("friend", friendUser);
                       friendUser.friends.push(userId);
                       await friendUser.save();

                 }else{
                        existingUser.friends.push({id: friendId, status: 'pending'});
                        await existingUser.save();
                        const loginUser = await UserModel.findOne({_id: userId});
                        // console.log("loginUser",loginUser)
                        loginUser.friends.push(friendId);
                        await loginUser.save();
                }
        }else{ 
            const newUser = new FriendshipModel({ userId: userId, friends: [{ id: friendId, status: 'pending' }] });
            await newUser.save();
            const loginUser = await UserModel.findOne({_id: userId});
            loginUser.friends.push(friendId);
            await loginUser.save();

        }

        } catch (error) {
            console.log(error);
            throw new ApplicationError("something Went Wrong", 300);
            
        }
        
      }

    async respondToRequest(userId,friendId, response) {
        try {
            const friendship = await FriendshipModel.findOne({ "userId": userId ,"friends.id": friendId, "friends.status": 'pending' });
            // console.log(friendship);
            if (friendship) {
          // Update the friendship status based on the response
          const friendIndex = friendship.friends.findIndex(friend => friend.id.toString() == friendId.toString());
        //   console.log(friendIndex);
        //   console.log("FriendIndex", friendIndex);
          friendship.friends[friendIndex].status = response == 'accept' ? 'accepted' : 'rejected';
          await friendship.save();
          if(friendship.friends[friendIndex].status == 'accepted'){
              const friend = await UserModel.findById(friendship.friends[friendIndex].id);
              friend.friends.push(friendship.userId);
              await friend.save();
          }
        } else {
          throw new ApplicationError('Friend request not found');
        }
        } catch (error) {
            console.log(error);
            throw new ApplicationError("something Went Wrong", 300);
        }
        
      }
    };
    
