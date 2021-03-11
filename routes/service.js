const express = require("express");
const router = express.Router();
const { isAuth, catchErrors } = require("../middlewares");
const {
  createService,
  updateService,
  deleteService,
  updateRating,
  updateStatus,
  getServiceByUser,
  getServiceById,
} = require("../controllers/serviceController");
//<<<<Create
router.post("/", isAuth, catchErrors(createService));
//<<<<<Update
router.patch("/:serviceId", isAuth, catchErrors(updateService));
//<<<<<Update Rating
router.patch("/rating/:serviceId", isAuth, catchErrors(updateRating));
//<<<<<Update Status
router.patch("/status/:serviceId", isAuth, catchErrors(updateStatus));
//<<<<<List of Services by Owner
router.get("/", isAuth, catchErrors(getServiceByUser));
//<<<<<Delete
router.delete("/:serviceId", isAuth, catchErrors(deleteService));
//<<<<<GetServicebyId
router.get("/:serviceId", isAuth, catchErrors(getServiceById));

module.exports = router;
