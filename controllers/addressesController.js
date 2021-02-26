const Addresses = require("../models/Addresses");
const Service = require("../models/Service");

exports.createAddresses = async (req, res) => {
  const {
    origin,
    destination,
    owner,
    service,
    origin_floor,
    destination_floor,
  } = req.body;

  const addresses = await Addresses.create({
    origin,
    destination,
    owner: req.user._id,
    service,
    origin_floor,
    destination_floor,
  });
  await Service.findByIdAndUpdate(service, {
    $push: { addresses: addresses._id },
  });
  res.status(201).json(addresses);
};

exports.updateAddresses = async (req, res) => {
  const { addressesId } = req.params;
  const { origin, destination, origin_floor, destination_floor } = req.body;
  const addresses = await Addresses.findById(addressesId);
  const { owner } = addresses;
  if (
    String(owner) === String(req.user._id) ||
    req.user.role === "Administrator"
  ) {
    const addresses_update = await Addresses.findByIdAndUpdate(
      addressesId,
      { origin, destination, origin_floor, destination_floor },
      { new: true }
    );
    res.status(200).json(addresses_update);
  } else
    return res
      .status(401)
      .json({ message: "Only the addresses' owner can update it" });
};

exports.deleteAddresses = async (req, res) => {
  const { addressesId } = req.params;
  const addresses = await Addresses.findById(addressesId);
  const { owner } = addresses;
  if (
    String(owner) === String(req.user._id) ||
    req.user.role === "Administrator"
  ) {
    await Addresses.findOneAndRemove(addressesId);
    return res
      .status(200)
      .json({ message: "These addresses were successfully deleted." });
  } else
    return res
      .status(401)
      .json({ message: "Only the addresses' owner can delete it" });
};

exports.getAddressesById = async (req, res) => {
  const { addressesId } = req.params;
  const currentaddresses = await Addresses.findById(addressesId);
  res.status(200).json(currentaddresses);
};
