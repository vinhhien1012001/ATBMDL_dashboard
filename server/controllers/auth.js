// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password ? true : false;
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    if (isMatch) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET
      );
      delete user.password;

      return res.status(200).json({ token, user });
    } else {
      return res.status(500).json({ status: "error", user: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
