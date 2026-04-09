const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const {
  getSummary,
  categoryBreakdown,
  monthlyTrends
} = require("../controllers/summaryController");

// All authenticated users
router.get("/", auth, role(["ANALYST", "ADMIN"]), getSummary);
router.get("/categories", auth, role(["ANALYST", "ADMIN"]), categoryBreakdown);
router.get("/trends", auth, role(["ANALYST", "ADMIN"]), monthlyTrends);
module.exports = router;