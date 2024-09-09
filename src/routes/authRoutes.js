const express = require("express");

const router = express.Router();
const authControllers = require("../controllers/authControllers");

router.get("/signup", authControllers.getSignUp);
router.post("/signup", authControllers.signup);
router.get("/signin", authControllers.getSignIn);
router.post("/signin", authControllers.signin);

module.exports = router;
