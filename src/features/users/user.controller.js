import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';

export default class UserController {
    constructor(){
        this.UserRepository = new UserRepository();
    }
    
    async signUp(req, res){
        const {
            username,
            email,
            password
          } = req.body;
        //   console.log("reqbody", req.body)
          try {
            const hashedPassword = await bcrypt.hash(password, 12)
            // console.log("hashedpass", hashedPassword);
            const avatarFileName = req.file ? req.file.filename : null;
            const User = await this.UserRepository.signUp({ username, email, password: hashedPassword, avatar: avatarFileName});
            // console.log("user",User);
            res.status(201).send(User);
            
          } catch (error) {
            
          }
    }
    async signIn(req,res){
        try {
            // console.log("working")
            const user = await this.UserRepository.findByEmail(req.body.email);
            if(!user){
                return res.status(400).send("Incorrect Credentials");
            }else{
                const result = await bcrypt.compare(req.body.password, user.password);
            if (result){
                const token = jwt.sign({
                    userId: user._id,
                    email: user.email
                },'nazUrlQi6WnlKoFs2u4mDRwBJf2ImzcO',
                {
                    expiresIn: '1h',
                });
                req.session.email = user.email;
                res.status(201).cookie("jwtToken", token, { maxAge: 900000, httpOnly: false }).json({ status: "success", msg: "login successfull", token });
                

            }else {
                return res.status(400).send("Incorrect Credentials");
            }
            }
        } catch (error) {
            console.log(error);
            
        }

    }

    async logout(req, res) {
        try {
            // Call the logout method from UserRepository passing the user's ID
            const userId = req.params.userId; // Assuming you have userId stored in req.user after authentication
            console.log("userID", userId);
            const result = await this.UserRepository.logout(userId);
            req.session.destroy();


            // Clear any existing JWT tokens on the client-side
            res.clearCookie("jwtToken").json({ status: "success", msg: "Logout successful" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", msg: "Logout failed" });
        }
    }
    async getUserDetails(req, res) {
        try {
            const userId = req.params.userId;
            console.log("controller USerid", userId)

            // Retrieve user details from the repository
            const userDetails = await this.UserRepository.getUserDetails(userId);

            // Send the filtered user details as the response
            res.status(200).json(userDetails);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve user details" });
        }
    }
    async getAllUserDetails(req, res) {
        try {
            // Retrieve all users' details from the repository
            const allUserDetails = await this.UserRepository.getAllUserDetails();

            // Send the filtered user details as the response
            res.status(200).json(allUserDetails);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve all user details" });
        }
    }
    async updateDetails(req, res) {
        try {
            const userId = req.params.userId;
            const updatedDetails = req.body;

            if ('password' in updatedDetails) {
                delete updatedDetails.password;
            }
            await this.UserRepository.updateUserDetails(userId, updatedDetails);

            res.status(200).json({ message: "User details updated successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to update user details" });
        }
    }
}