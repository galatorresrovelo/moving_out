const express = require("express");
const router = express.Router();
const { isAuth, catchErrors } = require("../middlewares");
const {
  createAddresses,
  updateAddresses,
  deleteAddresses,
  getAddressesById,
} = require("../controllers/addressesController");

//<<<<<Create
router.post("/", isAuth, catchErrors(createAddresses));
//<<<<<Update
router.patch("/:addressesId", isAuth, catchErrors(updateAddresses));
//<<<<<Delete
router.delete("/:addressesId", isAuth, catchErrors(deleteAddresses));
//<<<<<Get Addresses by Id
router.get("/:addressesId", isAuth, catchErrors(getAddressesById));

module.exports = router;
