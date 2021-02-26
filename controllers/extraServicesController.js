const ExtraServices = require("../models/ExtraServices");
const Service = require("../models/Service");

exports.createExtraServices = async (req, res) => {
  const { type, description, service, owner } = req.body;

  const extraservices = await ExtraServices.create({
    type,
    description,
    service,
    owner: req.user._id,
  });
  await Service.findByIdAndUpdate(service, {
    $push: { extra_Services: extraservices._id },
  });
  res.status(201).json(extraservices);
};

exports.updateExtraServices = async (req, res) => {
  const { extraservicesId } = req.params;
  const { type, description } = req.body;
  const extraservices = await ExtraServices.findById(extraservicesId);
  const { owner } = extraservices;
  if (
    String(owner) === String(req.user._id) ||
    req.user.role === "Administrator"
  ) {
    const extraservices_update = await ExtraServices.findByIdAndUpdate(
      extraservicesId,
      {
        type,
        description,
      },
      { new: true }
    );
    res.status(200).json(extraservices_update);
  } else
    return res
      .status(401)
      .json({ message: "Only the extra services' owner can update it" });
};

exports.deleteExtraServices = async (req, res) => {
  const { extraservicesId } = req.params;
  const extraservices = await ExtraServices.findById(extraservicesId);
  const { owner } = extraservices;
  if (
    String(owner) === String(req.user._id) ||
    req.user.role === "Administrator"
  ) {
    await ExtraServices.findOneAndRemove(extraservicesId);
    return res
      .status(200)
      .json({ message: "This extra service was successfully deleted." });
  } else
    return res
      .status(401)
      .json({ message: "Only the extra services' owner can delete it" });
};

exports.getExtraServicesById = async (req, res) => {
  const { extraservicesId } = req.params;
  const currentextraservices = await ExtraServices.findById(extraservicesId);
  res.status(200).json(currentextraservices);
};
