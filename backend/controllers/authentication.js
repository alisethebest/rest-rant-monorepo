const jwt = require("jsonwebtoken");
const User = require("../models/user");

// ... other authentication-related functions ...

// Route handler to fetch the current user based on JWT
exports.getCurrentUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); // Adjust according to your user model
    // Be sure to omit sensitive fields like password
    res.json({ user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(403).send({ message: "Invalid or expired token" });
  }
};
