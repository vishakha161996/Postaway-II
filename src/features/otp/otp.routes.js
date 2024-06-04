import express from "express";
import OtpController from "./otp.controller.js";
import { jwtAuth } from "../../middlewares/jwt-middleware.js";
import { auth } from "../../middlewares/auth.middleware.js";

const otpRouter = express.Router();
const otpController = new OtpController();

otpRouter.use(jwtAuth);
otpRouter.use(auth);

otpRouter.post('/send', (req, res) =>{
   otpController.sendOtp(req, res);
})
otpRouter.post('/verify/:otp', (req, res) => {
    otpController.verify(req, res);
})
otpRouter.post('/reset-password', (req, res) =>{
    otpController.resetPassword(req, res);
})


export default otpRouter;