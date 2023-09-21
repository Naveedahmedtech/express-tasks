const { body, validationResult } = require("express-validator");

module.exports.registerBody = [
  body("username").trim().notEmpty().withMessage("Username is required."),
  body("email").isEmail().withMessage("Invalid email format."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

module.exports.loginBody = [
  body("email").trim().notEmpty().withMessage("Email is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

module.exports.taskBody = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().optional(),
  body("image").trim().optional(),
];


module.exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.formatWith(({ msg }) => msg).mapped(),
    });
  }
  next();
};
