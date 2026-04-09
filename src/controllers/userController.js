const prisma = require("../utils/prisma");

// GET ALL USERS (ADMIN ONLY)
const getUsers = async (req, res) => {
  try {
    // 👇 get query params
    const { role, status } = req.query;

    const users = await prisma.user.findMany({
      where: {
        ...(role && { role }),
        ...(status && { status })
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true
      }
    });

    res.json({
      count: users.length,
      users
    });

  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE ROLE OR STATUS
const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { role, status } = req.body;

    const validRoles = ["VIEWER", "ANALYST", "ADMIN"];
    const validStatus = ["ACTIVE", "INACTIVE"];

    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    if (status && !validStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    /*if (req.user.id === userId) {
      return res.status(400).json({ error: "Cannot modify yourself" });
    }*/

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(role && { role }),
        ...(status && { status })
      }
    });

    const { password, ...safeUser } = updatedUser;

    res.json({
      message: "User updated successfully",
      user: safeUser
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUsers, updateUser };