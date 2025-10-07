import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { where } from "sequelize";

const jwtSecretKey = "TaskManagerKey2058";
const saltRounds = 10;

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [newUser, created] = await User.findOrCreate({
      where: { email: email },
      defaults: {
        email: email,
        password: hashedPassword,
      },
    });

    if (!created)
      return res
        .status(400)
        .json({ message: "Email already registered. Please Sign in" });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      jwtSecretKey,
      { noTimestamp: false, expiresIn: "1d" }
    );

    res.status(201).json({ message: "Registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (user === null)
      return res
        .status(400)
        .json({ message: "Email not found. Please register first." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password!" });

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecretKey, {
      noTimestamp: false,
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
