//@imports
const express = require("express");
const controller = require("../controllers/example");

//@constants
const router = express.Router();
const PATH = "example";

router.post(`/${PATH}/file`, controller.exampleTest);

module.exports = router;
