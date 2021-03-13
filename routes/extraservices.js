const express = require("express");
const router = express.Router();
const { isAuth, catchErrors } = require("../middlewares");

const {
  createExtraServices,
  updateExtraServices,
  deleteExtraServices,
  getExtraServicesById,
} = require("../controllers/extraServicesController");

//<<<<<Create
router.post("/", isAuth, catchErrors(createExtraServices));
//<<<<<Update
router.patch("/:extraservicesId", isAuth, catchErrors(updateExtraServices));
//<<<<<Delete
router.delete("/:extraservicesId", isAuth, catchErrors(deleteExtraServices));
//<<<<<Get Extra Services by Service
router.get("/:extraservicesId", isAuth, catchErrors(getExtraServicesById));

module.exports = router;
