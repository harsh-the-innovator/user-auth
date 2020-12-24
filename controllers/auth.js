const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errors.array()[0].msg,
    });
  }
  //   find email if it already exists or not
  User.find({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (user.length >= 1) {
      return res.status(422).json({
        message: "This email id already exist",
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          const user = User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
          });
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: err,
                message: "Signup Failed",
              });
            }
            res.status(200).json({
              message: "Signup Successfull",
            });
          });
        }
      });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errors.array()[0].msg,
    });
  }

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "Email or password is incorrect",
      });
    }
    // comparing passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          error: err,
          message: "Email or password is incorrect",
        });
      }
      if (result) {
        // generate token
        const userData = {
          userId: user._id,
          email: user.email,
        };
        const accessToken = jwt.sign(userData, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });

        return res.status(200).json({
          message: "Login Successfull",
          userId: user._id,
          token: accessToken,
        });
      } else {
        return res.status(401).json({
          message: "Email or password is incorrect",
        });
      }
    });
  });
};

exports.isAuthorized = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.auth = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
