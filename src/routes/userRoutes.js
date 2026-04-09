const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const {
  getUsers,
  updateUser
} = require("../controllers/userController");

// Admin only routes
router.get("/", auth, role(["ADMIN"]), getUsers);
router.patch("/:id", auth, role(["ADMIN"]), updateUser);

module.exports = router;