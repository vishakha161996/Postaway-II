import mongoose, { ObjectId } from "mongoose";
import { UserModel } from "../users/user.schema.js";
import { sendMail } from "../../middlewares/nodemailer.middleware.js";
import OtpModel from "./otp.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class OtpRepository{

    async sendOtp(email){
        try {
        const user = await UserModel.findOne({email: email});
        const userId = user._id;
        const generateOtp = generateRandomNumber();
        // console.log("Userid", userId);
        const newOtpModel = new OtpModel({
            userId: new mongoose.Types.ObjectId(userId),
            otp: generateOtp
        })
        await newOtpModel.save();

        const result =  sendMail(email,generateOtp);
        return result;
        } catch (error) {
            throw new ApplicationError("something went wrong in sendOTp", error);
            console.log('something went wrong: ' + error);
        }  
    }
    async verify(userId, otp){
        try {
            const otpData = await OtpModel.findOne({ userId: userId, otp: otp });
            if (!otpData) {
                return false;
            }else{
            return true;
            }
            const currentTime = new Date();
            if (currentTime > otpData.createdAt.getTime() + 5 * 60 * 1000) {
                return false;
            }
        } catch (error) {
            throw new ApplicationError("Something went wrong while verifying OTP", 500);
        }

    }
    async resetPassword(userId,hashedPassword){
        try{
    
            // Check if user exists and OTP is available in session
            let user = await UserModel.findById(userId);
            if (user) {
                // Update password only if OTP is available in session
                user.password = hashedPassword;
                await user.save();
    
            } else {
                throw new Error("No such user found", 404);
            }
            
        } catch(error){
            console.log(error);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}


function generateRandomNumber() {
    return Math.floor(Math.random() * 900000) + 100000;
 }
