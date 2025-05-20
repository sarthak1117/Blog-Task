import mongoose, {Schema} from "mongoose";


const BlogSchema = new Schema({

    Title: {
        type: String,
        required: true
    },

    blogImage:{
        type: String,
        required: true
    },
    Description: {
        type: String
    }

})

export const Blog = mongoose.model("Blog", BlogSchema)