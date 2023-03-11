const express = require("express");
const getProducts = require("../service/product-service.js");
const router = express.Router();
const prodPath = "./data/products.json";

router.get("/", async (req, res) => {
  console.log("products GET huselt");
  const data = await getProducts(prodPath);
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(404).send({ message: "not found" });
  }
});

module.exports = router;
