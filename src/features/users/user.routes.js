
import express from 'express';
import UserController from './user.controller.js';
import { upload } from '../../middlewares/fileUpload.middleware.js';
import { jwtAuth } from '../../middlewares/jwt-middleware.js';
import { auth } from '../../middlewares/auth.middleware.js';


const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup', upload.single('upload'),(req, res)=>{
userController.signUp(req, res);
})

userRouter.post('/signin', (req,res)=>{
    userController.signIn(req,res);
})

userRouter.post('/logout/:userId',jwtAuth, auth, (req,res)=>{
    userController.logout(req, res);
})

userRouter.get('/get-details/:userId',auth,(req, res)=>{
    userController.getUserDetails(req,res);
})

userRouter.get('/get-all-details',(req, res)=>{
    userController.getAllUserDetails(req,res);
})

userRouter.put('/update-details/:userId',  (req, res)=>{
    userController.updateDetails(req, res);
})

export default userRouter;


// The API structure for the "Social-Media" project can be organized as follows:
// Authentication Routes

// /api/users/signup: Register a new user account.

// /api/users/signin: Log in as a user.

// /api/users/logout: Log out the currently logged-in user.

// /api/users/logout-all-devices: Log out the user from all devices. User Profile Routes

// /api/users/get-details/:userId: Retrieve user information, ensuring sensitive data like passwords is not exposed.

// /api/users/get-all-details:  Retrieve information for all users, avoiding display of sensitive credentials like passwords.

// /api/users/update-details/:userId: Update user details while ensuring that sensitive data like passwords remains secure and undisclosed. 