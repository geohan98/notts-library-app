const express = require("express");
const router = express.Router();
const copyAPI = require("../api/copy-api");

router.get("/", copyAPI().getAllCopies);
router.post("/add", copyAPI().addNewCopy);
router.get("/:id", copyAPI().getCopyByID);
router.get("/:id/withdraws", copyAPI().getCopyWithdrawsByID);
router.put("/:id/check-in", copyAPI().checkinCopyByID);
router.put("/:id/check-out", copyAPI().checkoutCopyByID);
router.get("/:id/status", copyAPI().checkCopyStatus);

export = router;
