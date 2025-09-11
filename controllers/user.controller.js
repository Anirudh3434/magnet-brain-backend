import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// ---------------------- REGISTER ----------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- LOGIN ----------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = user.generateAccessToken(); // or user.generateAccessToken if renamed
    const refreshToken = user.generateRefreshToken();

    // Store tokens in cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,       // prevents JS access
      secure: process.env.NODE_ENV === "production", // only over HTTPS in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// ---------------------- REFRESH TOKEN ----------------------
export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken; // get from cookie

    if (!refreshToken) return res.status(401).json({ message: "Refresh token required" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid refresh token" });

      const accessToken = jwt.sign(
        { id: decoded.id },
        process.env.ACCESS_TOKEN,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
      );

      // update cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000
      });

      res.json({ message: "Access token refreshed" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" });
        res.json({success: true ,  users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}