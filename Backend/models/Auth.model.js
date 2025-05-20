import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({

    Email: {
        type: String,
        required: true,
        unique: true
    },

    Password: {
        type: String, 
        required:true
    },

    ProfileImage: {
        type: String
    }

}) 

export const User = mongoose.model("User", userSchema);