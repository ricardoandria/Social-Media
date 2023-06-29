import User from "../models/User.js";

export const getUser = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getUserFriends = async (req,res) => {
    try {
        const {id} = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    )
    const formattedFriend = friends.map(
        ({_id,firstName, lastName, occupation, location, picturePath}) => {
            return { _id,firstName, lastName, occupation, location, picturePath}
        }
    )

    res.status(200).json(formattedFriend);
    } catch (error) {
        res.status(500).json({msg: error.message})
        
    }
    
}

export const addRemoveFriend = async (req,res) => {
    try {
        const {id,friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id)
        } else {
            user.friends.push(friends);
            friend.friends.push(id)
        }

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriend = friends.map(
            ({_id,firstName, lastName, occupation, location, picturePath}) => {
                return { _id,firstName, lastName, occupation, location, picturePath}
            }
        )
        await user.save();
        await friend.save();
    } catch (error) {
        res.status(500).json({msg: error.message})
        
    }
}