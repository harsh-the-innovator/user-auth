const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const { getUserById, getUserInfo } = require("../controllers/user");
const { isAuthorized } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isAuthorized, getUserInfo);

module.exports = router;
