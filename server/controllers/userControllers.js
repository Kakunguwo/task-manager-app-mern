import HttpError from "../models/errorModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

//getUser
// API : api/user/:id
// Protected
export const getUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select('-password');
        if(!user){
            return next(HttpError("User not found", 404));
        }

        res.status(200).json(user);
    
    } catch (error) {
        console.log(error);
        return next(HttpError("Failed to fetch the user", 500))
    }
};

//update user
//API: api/user/edit-user
//Protected: PATCH
export const updateUser =async (req, res, next) => {
    try {
        const {name, email, currentPassword, newPassword, confirmPassword} = req.body;
        if(!name || !email || !currentPassword || !newPassword || !confirmPassword){
            return next(HttpError("Fill in all the fields", 421));
        }

        const emailExists = await User.findOne({email: email});

        if(emailExists && (emailExists._id.toString() !== req.user.id)){
            return next(HttpError("Email already exists", 421));
        }

        const user = await User.findById(req.user.id);

        const validCurrentPassword = await bcrypt.compare(currentPassword, user.password);

        if(!validCurrentPassword){
            return next(HttpError("Invalid currebt password", 421));
        }

        if((newPassword.trim()).length < 6){
            return next(HttpError("Password should be at least 6 characters", 421));
        }

        if(newPassword !== confirmPassword){
            return next(HttpError("Passwords do not match", 421));
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            name: name,
            email: email,
            password: hashedPassword,
        }, {new: true});

        if(!updatedUser){
            return next(HttpError("Failed to update", 421));
        }

        res.status(200).json({
            message: "Update successful",
            updatedUser,
        });

    
    } catch (error) {
        console.log(error);
        return next(HttpError("Something went wrong", 500))
    }
};

//delete user
//API: /api/user/:id
// Protected: delete
export const deleteUser = async(req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return next(HttpError("Failed to delete", 421));
        }

        res.status(200).json({
            message: "User deleted"
        })
    } catch (error) {
        console.log(error);
        return next(HttpError("Something went wrong", 500));
    }
}