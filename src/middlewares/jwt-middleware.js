import jwt from 'jsonwebtoken'; 
import { ApplicationError } from '../error-handler/applicationError.js';
export const jwtAuth = (req, res, next) =>{
    const token = req.cookies.jwtToken;
    // console.log(req.cookies.jwtToken);
    try{
        const payload = jwt.verify(token,'nazUrlQi6WnlKoFs2u4mDRwBJf2ImzcO');
        // console.log("payload", payload);
         // Attach userId to request object for further use
         req.userId = payload.userId;
         req.email = payload.email;
        next();
    }catch(error){
        throw new ApplicationError("User is invalid", 401);
    }
};