import BlogModel from "../models/blogModel.js";

export const getSingleBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.query.id).populate({
            path: 'author', 
            select: [
                '_id', 'name', 'email', 'image', 'emailVerified', 'role', 'verifyToken', 'forgotPasswordToken', 'verifyTokenExpiry', 'forgotPasswordTokenExpiry', 'createdAt', 'updatedAt'
            ]
        });

        return (
            blog ? res.status(200).json(blog) :
            res.status(205).json({message: "blog not found"})
        )
    }
    catch(err) {
        return res.status(500).json(err.message);
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find().populate({
            path: 'author', 
            select: [
                '_id', 'name', 'email', 'image', 'emailVerified', 'role', 'verifyToken', 'forgotPasswordToken', 'verifyTokenExpiry', 'forgotPasswordTokenExpiry', 'createdAt', 'updatedAt'
            ]
        });

        return (
            blogs ? res.status(200).json(blogs) :
            res.status(205).json({message: "No blog found"})
        )
    }
    catch(err) {
        return res.status(500).json(err.message);
    }
}

export const createBlog = async (req, res) => {
    try {
        const { title, description, category, image, author } = req.body;
        const blog = await BlogModel.create({
            title, description, category, image, author
        })
        return (
            blog ? res.status(201).json({message: "blog created successfully"}) :
            res.status(200).json({message: "blog creation failed"})
        )
    }
    catch(err) {
        return res.status(500).json(err.message);
    }
}

export const getBlogsOfAdmin = async (req, res) => {
    try {
        if(req.query.authorId) {
            console.log(req.query.authorId);
            const blogs = await BlogModel.find({ author: req.query.authorId }).populate({
                path: 'author', 
                select: [
                    '_id', 'name', 'email', 'image', 'emailVerified', 'role', 'verifyToken', 'forgotPasswordToken', 'verifyTokenExpiry', 'forgotPasswordTokenExpiry', 'createdAt', 'updatedAt'
                ]
            });
            if(blogs) {
                return res.status(200).json(blogs);
            }
        }
        return res.status(205).json({message: "blogs not found"})
    }
    catch(err) {
        return res.status(500).json(err.message);
    }
}

export const deleteBlogsOfAdmin = async (req, res) => {
    try {
        if(req.query.id) {
            const blog = await BlogModel.findByIdAndDelete(req.query.id);
            if(blog) {
                return res.status(202).json({message: "blog deleted successfully"});
            }
        }
        return res.status(200).json({message: "blogs not found"})
    }
    catch(err) {
        return res.status(500).json(err.message);
    }
}