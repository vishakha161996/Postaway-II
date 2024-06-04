import express from "express";
import userRouter from "./src/features/users/user.routes.js";
import otpRouter from "./src/features/otp/otp.routes.js";
import freindsRouter from "./src/features/friends/friends.routes.js";
import postRouter from "./src/features/posts/posts.routes.js";
import commentRouter from "./src/features/comments/comments.routes.js";
import likeRouter from "./src/features/likes/likes.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import {loggerMiddleware, errorLoggerMiddleware} from "./src/middlewares/logger.middleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false},
  }));
app.use(loggerMiddleware);


// All Routes 
app.use('/api/users', userRouter);
app.use('/api/otp', otpRouter);
app.use('/api/posts', postRouter);
app.use('/api/friends',freindsRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);


app.use(errorLoggerMiddleware);
export default app;
