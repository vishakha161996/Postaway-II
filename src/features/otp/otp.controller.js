import { ApplicationError } from "../../error-handler/applicationError.js";
import OtpRepository from "./otp.repository.js";
import bcrypt from 'bcrypt';

export default class OtpController {
    constructor(){
        this.OtpRepository = new OtpRepository();
    }
    async sendOtp(req, res){
        try {
            const email = req.email;
            // console.log("email", req.email)
        const result =  await this.OtpRepository.sendOtp(email);
         res.status(200).send(result);

        } catch (error) {
            console.log(error);
        }

    }
    async verify(req,res){
        try {
            const userId = req.userId;
            const otp = req.params.otp;
            const result = await this.OtpRepository.verify(userId, otp);
            if (result){
                req.session.otp = otp;
                res.status(200).send("You may change the password");
            }
            else{
                res.status(200).send("your Otp may expired or u put the invalid Otp");
            }
        } catch (error) {
            
        }
    }
    async resetPassword(req,res){
        const {newPassword} = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    const userId = req.userId;
    try{
        if(!req.session.otp){
            res.status(404).send("typed I wrong OTP")
        }
        await this.OtpRepository.resetPassword(userId, hashedPassword)
      delete req.session.otp;
      res.status(200).send("Password is updated");
    }catch(error){
      console.log(error);
    //   throw new ApplicationError("somwthing went wrong", 500)
      console.log("Passing error to middleware");
    }

    }
}
