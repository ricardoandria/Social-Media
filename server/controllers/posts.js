import User from "../models/User.js";
import Post from "../models/Post.js";

export const createPost = async (req,res) => {
    try {
        const {userId,description, image} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.image,
            image,
            likes:{},
            comments: [],
        })

        await newPost.save();

        const post = await Post.find();

        res.status(201).json(post)

    } catch (error) {
        res.status(500).json({msg: error.message})
    }
} 


export const getFeedPosts = async (req,res) => {
    try {
        const post = await Post.find();

        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getUserPosts = async (req,res) => {
    try {
        const {userId} = req.params;

        const posts = await Post.find({userId});

        res.status(201).json(posts)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const likePost = async (req,res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;

        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId,true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        )

        res.status(201).json(updatedPost)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}