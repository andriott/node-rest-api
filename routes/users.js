const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");

router.post("/signup", usersCtrl.formValidation("signup"), usersCtrl.signup);
router.post("/signin", usersCtrl.formValidation("signin"), usersCtrl.signin);
router.post("/profile", usersCtrl.formValidation("profile"), usersCtrl.profile);

router.post("/profile-pic", (req, res, next) => {
  res.status(200).send({
    message: "User profile picture update",
  });
});


module.exports = router;
