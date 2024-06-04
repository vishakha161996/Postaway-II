import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    friends: [
        {
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
        }
    ]
  });

  export const FriendshipModel = mongoose.model('Friends', friendshipSchema);