const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id)
    .select("name email")
    .exec((err, user) => {
      if (err) {
        return res.status(404).json({
          error: err,
          message: "User not found",
        });
      }
      req.profile = user;
      next();
    });
};

exports.getUserInfo = (req, res) => {
  console.log(req.profile);
  return res.json(req.profile);
};
