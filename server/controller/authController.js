import Admin from "../schemas/adminSchema";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username,  password });
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    const { password, ...others } = admin._doc;
    const token = jwt.sign({ id: admin._id }, "bankai", { expiresIn: "8h" });
    res.status(200).json(others, token);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
