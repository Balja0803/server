const express = require("express");
const checkUser = require("../service/user-service.js");
const router = express.Router();
const userPath = "./data/users.json";

router.post("/login", async (req, res) => {
  console.log("user login huselt", req.body.username);

  const check = await checkUser(userPath, req.body);
  if (check) {
    res.status(200).send({ success: true });
  } else {
    res.status(403).send({ message: "not valid!" });
  }
});

module.exports = router;
