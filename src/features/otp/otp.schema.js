import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '5m' // Automatically delete documents after 5 minutes
    }
});

const OtpModel = mongoose.model('OTP', otpSchema);

export default OtpModel;
