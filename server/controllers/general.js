import Admin from "../models/Admin.js";

export const signIn = async (req, res) => {
  const user = await Admin.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = req.body.password === user.password ? true : false;

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        email: user.email,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
};
