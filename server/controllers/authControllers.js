import HttpError from "../models/errorModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//Register
//API: /api/auth/register
//Unprotected

export const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return next(HttpError("Fill all fields", 421));
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return next(HttpError("User exists", 422));
    }

    if (password.trim().length < 6) {
      return next(HttpError("Password should be at least 6 characters", 421));
    }

    if (password !== confirmPassword) {
      return next(HttpError("Passwords do not match", 421));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) return next(HttpError("Failed to create user", 421));

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return next(HttpError("Failed to register", 421));
  }
};

//Login
//API: /api/auth/login
//Unprotected

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(HttpError("Fill all fields", 421));
    }

    await User.findOne({ email: email }).then(async (user) => {
      if (!user) {
        return next(HttpError("User not found", 404));
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return next(HttpError("Invalid password", 421));
      }

      const {password: pass, ...userWithOutPass} = user._doc;
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res
        .status(200)
        .cookie("access-token", token, { httpOnly: true })
        .json({ token, userWithOutPass });
    });
  } catch (error) {
    console.log(error);
    return next(HttpError("Failed to log in", 421));
  }
};
