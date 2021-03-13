const Service = require("../models/Service");
const User = require("../models/User");

exports.createService = async (req, res) => {
  const { start_Date, end_Date, _id } = req.body;

  const service = await Service.create({
    start_Date,
    end_Date,
    status: "Draft",
    owner: req.user._id,
  });
  await User.findByIdAndUpdate(req.user._id, {
    $push: { services: service._id },
  });
  res.status(201).json({ message: "Successfully created", service });
};

exports.updateService = async (req, res) => {
  const { serviceId } = req.params;
  const { start_Date, end_Date } = req.body;
  const service = await Service.findById(serviceId);
  const { owner } = service;
  if (
    String(owner) === String(req.user._id) ||
    req.user.role === "Administrator"
  ) {
    const service_update = await Service.findByIdAndUpdate(
      serviceId,
      { start_Date, end_Date, status: "Draft" },
      { new: true }
    );
    res.status(200).json({ service: service_update });
  } else
    return res
      .status(401)
      .json({ message: "Only the service's owner can update it" });
};

exports.deleteService = async (req, res) => {
  const { serviceId } = req.params;
  const service = await Service.findById(serviceId);
  const { owner } = service;
  if (
    String(owner) === String(req.user._id) ||
    req.user.role === "Administrator"
  ) {
    await Service.findOneAndRemove(serviceId);
    return res
      .status(200)
      .json({ message: "This service was successfully deleted." });
  } else
    return res
      .status(401)
      .json({ message: "Only the owner of the service can delete it" });
};

exports.updateRating = async (req, res) => {
  const { serviceId } = req.params;
  const { rating } = req.body;
  const service = await Service.findById(serviceId);
  const { status, owner } = service;
  if (String(owner) !== String(req.user._id)) {
    res.status(401).json({
      message: "Only the requestor of this service can update the rating",
    });
  }
  if (
    req.user.role === "Administrator" ||
    (String(owner) === String(req.user._id) && status === "Complete")
  ) {
    const service_update = await Service.findByIdAndUpdate(
      serviceId,
      { rating },
      { new: true }
    );
    res.status(200).json(service_update);
  } else {
    res.status(401).json({
      message: "Only when the service has been completed, it can be rated",
    });
  }
};

exports.updateStatus = async (req, res) => {
  const { serviceId } = req.params;
  const { status } = req.body;
  if (req.user.role === "Administrator") {
    const service = await Service.findByIdAndUpdate(
      serviceId,
      { status },
      { new: true }
    );
    res.status(200).json(service);
  } else
    return res
      .status(401)
      .json({ message: "Only the administrator can update it" });
};

exports.getServiceByUser = async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "services",
    "status rating start_Date end_Date items addresses extra_Services"
  );
  const { services } = user;
  res.status(200).json({ services });
};

exports.getServiceById = async (req, res) => {
  const { serviceId } = req.params;
  const currentService = await Service.findById(serviceId);
  res.status(200).json(currentService);
};
