export const auth = (req, res, next)=>{
    if(req.session.email){   
            // console.log("hit auth", req.session.email)
        next();
    }else{
        res.status(401).send("your session is expired");
        // console.log("hit auth else", req.session.email)

    }
}