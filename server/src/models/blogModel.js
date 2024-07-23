import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true,
})

const BlogModel = mongoose.models?.Blog || mongoose.model('Blog', blogSchema);

export default BlogModel;