const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma"); // 👈 import DB

const auth = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ THIS IS WHERE YOU ADD IT
    if (user.status === "INACTIVE") {
      return res.status(403).json({ error: "User inactive" });
    }

    req.user = user; // attach full user
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = auth;