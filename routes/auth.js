const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");

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

/* GET Google Authentication API. */
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  function (req, res) {
    const userData = {
      userId: req.user.userId,
      email: req.user.email,
    };
    const token = jwt.sign(userData, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.redirect(
      `http://localhost:3000/login?token=${token}&userId=${userData.userId}`
    );
  }
);

module.exports = router;
