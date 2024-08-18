const express = require("express");
const router = express.Router();
const wordControllers = require("../controllers/wordsController");

router.get("/", wordControllers.getWord);
router.get("/word/:id", wordControllers.getOne);
router.get("/allwords", wordControllers.getAllWords);
router.post("/words", wordControllers.postWord);
router.put("/words/:id", wordControllers.updateWord);
router.delete("/words/:id", wordControllers.deleteWord);

module.exports = router;
