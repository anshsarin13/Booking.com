import User from "../models/User.js";


export const updateUser = async (req, res, next) => {
//UPDATE=use PUT
    try{
        const updateUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updateUser);

    }catch(err){
        next(err);
    }
};


export const deleteUser = async (req, res, next) => {
//DELETE=use DELETE
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");

    }catch(err){
        next(err);
    }
};

export const getUser = async (req, res, next) => {
//GET User by id INFO=use GET
    try{
        const user=await User.findById(req.params.id);
        res.status(200).json(user);

    }catch(err){
        next(err);
    }
};

export const getallUser = async (req, res, next) => {
//GET all Users INFO=use GET

    // const failed=true;
    // if(failed){
    //     return next(createError(401,"you are not authenticated"));
    // }
        try{
            const users=await User.find();
            res.status(200).json(users);
        }catch(err){
            next(err);
        }
    };