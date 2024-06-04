
import { UserModel } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserRepository {
    async signUp(user) {
        try {
            const User = new UserModel(user);
            console.log("newUser",User);
            const result = await User.save();
            console.log("ResultUser",result);
            return result;
        } catch (error) {
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async singIn(email, password){
        try {
            return await UserModel.findOne({email, password});
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with database", 500);
            
        }
    }
    async findByEmail(email) {
        try{
        return await UserModel.findOne({email});
      }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
      }
      }
      async logout(userId) {
        try {
            const user = await UserModel.findById(userId);
            if(!user){
                return {message :"Invalid ID"}
            }
            
            return { message: "Logout successful" };
        } catch (error) {
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async getUserDetails(userId) {
        try {
            // Retrieve user data from the database
            const user = await UserModel.findById(userId);
            console.log("USer in Model", user);

            // Filter out sensitive fields like password
            const userDetails = {
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar, // You can include other non-sensitive fields here
            };

            return userDetails;
        } catch (error) {
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async getAllUserDetails() {
        try {
            // Retrieve all users' data from the database
            const users = await UserModel.find({}, { password: 0 });

            const userDetailsArray = users.map(user => ({
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar, 
            }));

            return userDetailsArray;
        } catch (error) {
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async updateUserDetails(userId, updatedDetails) {
        try {
            // Find the user by ID and update the details
            await UserModel.findByIdAndUpdate(userId, updatedDetails, { new: true });
            const updatedUser = await UserModel.findById(userId);
            return updatedUser;
        } catch (error) {
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}
