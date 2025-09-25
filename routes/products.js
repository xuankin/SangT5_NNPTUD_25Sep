var express = require("express");
var router = express.Router();
let productModel = require("../schemas/product");

/* GET products listing. */
router.get("/", async function (req, res, next) {
  let products = await productModel.find({});
  res.send({
    success: true,
    data: products,
  });
});

router.get("/:id", async function (req, res, next) {
  try {
    let item = await productModel.findById(req.params.id);
    res.send({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      data: error,
    });
  }
});

router.post("/", async function (req, res, next) {
  try {
    let newItem = new productModel({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
    });
    await newItem.save();
    res.send({
      success: true,
      data: newItem,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      data: error,
    });
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    let updatedItem = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
      },
      { new: true }
    );
    res.send({
      success: true,
      data: updatedItem,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      data: error,
    });
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    let deletedItem = await productModel.findByIdAndUpdate(
      req.params.id,
      { isDelete: true },
      { new: true }
    );
    if (!deletedItem) {
      return res.status(404).send({
        success: false,
        data: "Product not found",
      });
    }
    res.send({
      success: true,
      data: deletedItem,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      data: error,
    });
  }
});

module.exports = router;
