import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// signup function
export const signup = async (req, res) => {
  try {
    // take user input
    const { email, name, password } = req.body;

    // check for empty fields
    if (!(email && name && password)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check for user with same emailid in database
    const exitUser = await UserModel.findOne({ email }).select("email");
    if (exitUser) {
      return res.status(400).json({
        message: "User with same email id already exist",
      });
    }

    // hasing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save data to database
    const user = await UserModel.insertOne({
      email,
      name,
      password: hashedPassword,
    });

    // create json web token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // send response back to client
    res.status(201).json({
      message: "User created successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// login function
export const login = async (req, res) => {
  try {
    // take input from user
    const { email, password } = req.body;

    // check for empty fields
    if (!(email && password)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // check for user in database
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found with this email id",
      });
    }
    // if I got the user - then check the password
    // check password which was entered by user and password which was saved in database
    const isMatch = await bcrypt.compare(password, user.password);
    // is password doesnot match
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    // create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    // send response back to client
    return res.status(200).json({
      message: "User logged in successful",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {}
};

// change password with entering email id
export const changePassword = async (req, res) => {
  try {
    // take user input
    const { email, oldPassword, newPassword } = req.body;

    // check for empty fields
    if (!(email && oldPassword && newPassword)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check for user in database
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // check old password matches with password in DB
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // change password
    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update the user with new password
    // user.password = hashedPassword;
    // await user.save();

    await UserModel.findOneAndUpdate({ email }).set({
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log("error in change password controller", e);
  }
};

// get me controller

export const checkMe = async (req, res) => {
  try {
    const id = req.user;
    if (!id) {
      return res.status(403).json({
        message: "Unauthorized: User id not found",
      });
    }
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      return res.status(403).json({
        message: "Unauthorized: User not found",
      });
    }
    return res.status(200).json({
      user,
    });
  } catch (error) {}
};

export const changePasswordByToken = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const id = req.user;
  if (!id) {
    return res.status(403).json({
      message: "Unauthorized: User id not found",
    });
  }

  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(403).json({
      message: "Unauthorized: User not found",
    });
  }

  // check oldpassword with the password in database
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Password is incorrect",
    });
  }
  // hash new password
  const hp = await bcrypt.hash(newPassword, 10);

  user.password = hp;
  await user.save();

  return res.status(200).json({
    message: "password changed successfully",
  });
};
