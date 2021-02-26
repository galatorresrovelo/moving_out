const express = require("express");
const router = express.Router();
const { isAuth, catchErrors } = require("../middlewares");
const {
  createItems,
  updateItems,
  deleteItems,
  getItemsById,
} = require("../controllers/itemsController");

//<<<<<Create
router.post("/", isAuth, catchErrors(createItems));
//<<<<<Update
router.patch("/:itemsId", isAuth, catchErrors(updateItems));
//<<<<<Delete
router.delete("/:itemsId", isAuth, catchErrors(deleteItems));
//<<<<<Get Items by Service
router.get("/:itemsId", isAuth, catchErrors(getItemsById));

module.exports = router;
