const { index, show, create } = require("../controllers/todos.controller");

const router = require("express").Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", create);
router.put("/:id");
router.delete("/:id");

module.exports = router;
