import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';

//@decs Auth user & get token
//@route POST /api/users/login
//@accecc Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Invalid Emial of password');
    }

})

//@decs Register User 
//@route POST /api/users/login
//@accecc Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400); //client error
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(400); //client error
        throw new Error('Invalid user data');
    }
})

//@decs Logout user / clear cookie
//@route POST /api/users/logout
//@accecc Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Logged Out sccessfully' })
})

//@decs get User profile
//@route GET /api/users/profile
//@accecc Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

//@decs update User profile
//@route PUT /api/users/profile
//@accecc Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

//@decs Get Users
//@route GET /api/users
//@accecc Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
})

//@decs Get User by ID
//@route GET /api/users/:id
//@accecc Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
    res.send('get user by id');
})

//@decs Delete Users
//@route DELETE /api/users/:id
//@accecc Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
})

//@decs Update User
//@route PUT /api/users/:id
//@accecc Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user');
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser
}





