const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require("../controllers/recordController");

// Create → ADMIN only
router.post("/", auth, role(["ADMIN"]), createRecord);

// View → All authenticated users
router.get("/", auth, getRecords);

// Update → ADMIN only
router.put("/:id", auth, role(["ADMIN"]), updateRecord);

// Delete → ADMIN only
router.delete("/:id", auth, role(["ADMIN"]), deleteRecord);

module.exports = router;