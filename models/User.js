import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
  
},
{timestamps:true} //adds created at and updated at timestamps
);

export default mongoose.model("User",UserSchema)