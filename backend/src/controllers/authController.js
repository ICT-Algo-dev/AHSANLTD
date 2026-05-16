import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import EmailVerification from "../models/EmailVerification.js";
import User from "../models/User.js";
import { sendVerificationEmail } from "../utils/email.js";

const normalizeEmail = (email) => email.trim().toLowerCase();

const generateCode = () => crypto.randomInt(100000, 999999).toString();
const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: false,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const buildToken = (user) =>
  jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET || "change-me",
    { expiresIn: "7d" }
  );

export const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    res.status(400).json({ message: "Name, email, password and confirmPassword are required" });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ message: "Password and confirm password do not match" });
    return;
  }

  const normalizedEmail = normalizeEmail(email);
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    res.status(409).json({ message: "An account with this email already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = generateCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await EmailVerification.findOneAndUpdate(
    { email: normalizedEmail },
    {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      verificationCode,
      expiresAt,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  try {
    await sendVerificationEmail({
      email: normalizedEmail,
      name: name.trim(),
      code: verificationCode,
    });
  } catch (error) {
    await EmailVerification.deleteOne({ email: normalizedEmail });
    res.status(500).json({
      message: error.message || "Verification email send failed",
    });
    return;
  }

  res.status(200).json({
    message: "Verification code sent to email",
    email: normalizedEmail,
  });
};

export const verifyRegistration = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    res.status(400).json({ message: "Email and code are required" });
    return;
  }

  const normalizedEmail = normalizeEmail(email);
  const pendingUser = await EmailVerification.findOne({ email: normalizedEmail });

  if (!pendingUser) {
    res.status(404).json({ message: "Verification request not found or expired" });
    return;
  }

  if (pendingUser.expiresAt.getTime() < Date.now()) {
    await EmailVerification.deleteOne({ _id: pendingUser._id });
    res.status(400).json({ message: "Verification code has expired" });
    return;
  }

  if (pendingUser.verificationCode !== String(code).trim()) {
    res.status(400).json({ message: "Code incorrect" });
    return;
  }

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    await EmailVerification.deleteOne({ _id: pendingUser._id });
    res.status(409).json({ message: "An account with this email already exists" });
    return;
  }

  const user = await User.create({
    name: pendingUser.name,
    email: pendingUser.email,
    password: pendingUser.password,
    isVerified: true,
  });

  await EmailVerification.deleteOne({ _id: pendingUser._id });

  const token = buildToken(user);
  res.cookie("authToken", token, cookieOptions);

  res.status(201).json({
    message: "Register successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  const normalizedEmail = normalizeEmail(email);
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const token = buildToken(user);
  res.cookie("authToken", token, cookieOptions);

  res.json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const getCurrentUser = async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};

export const logout = async (_req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.json({ message: "Logout successful" });
};
