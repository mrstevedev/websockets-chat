const express = require("express");
const { getMessages, addMessage } = require("../controllers/messages");

const router = express.Router();

router.route("/").get(getMessages).post(addMessage);

// router.get('/', (req, res) => {
//     res.json('Hey young world');
// })

module.exports = router;
