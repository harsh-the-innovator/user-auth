const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const { signup, login } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name is required"),
    check("email", "Please provide valid email id").isEmail(),
    check("password", "Password should be atleaast 3 characters").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email", "Please provide valid email id").isEmail(),
    check("password", "Password should be atleast 3 characters").isLength({
      min: 3,
    }),
  ],
  login
);
module.exports = router;
