import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return next(createError(401,"not authenticated"))
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(createError(401,"token not valid"))
        }
        req.user=user;
        next();
    })
};

export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id ){
            next()
        }
        else{
            if(err)return next(createError(403,"you are not authorized!"))
        }
    });
};


