const Items = require("../models/Items");
const Service = require("../models/Service");

exports.createItems = async (req, res) => {
  const {
    name,
    description,
    type,
    url,
    height,
    width,
    weight,
    service,
    plaster,
    owner,
  } = req.body;

  const items = await Items.create({
    name,
    description,
    type,
    url,
    height,
    width,
    weight,
    service,
    plaster,
    owner: req.user._id,
  });
  await Service.findByIdAndUpdate(service, {
    $push: { items: items._id },
  });
  res.status(201).json(items);
};

exports.updateItems = async (req, res) => {
  const { itemsId } = req.params;
  const {
    name,
    description,
    type,
    url,
    height,
    width,
    weight,
    plaster,
  } = req.body;
  const items = await Items.findById(itemsId);
  const { owner } = items;
  if (
    String(owner) === String(req.user._id) ||
    req.user.role === "Administrator"
  ) {
    const items_update = await Items.findByIdAndUpdate(
      itemsId,
      {
        name,
        description,
        type,
        url,
        height,
        width,
        weight,
        plaster,
      },
      { new: true }
    );
    res.status(200).json(items_update);
  } else
    return res
      .status(401)
      .json({ message: "Only the items' owner can update it" });
};

exports.deleteItems = async (req, res) => {
  const { itemsId } = req.params;
  const items = await Items.findById(itemsId);
  const { owner } = items;
  if (
    String(owner) === String(req.user._id) ||
    req.user.role === "Administrator"
  ) {
    await Items.findOneAndRemove(itemsId);
    return res
      .status(200)
      .json({ message: "This item was successfully deleted." });
  } else
    return res
      .status(401)
      .json({ message: "Only the items' owner can delete it" });
};

exports.getItemsById = async (req, res) => {
  const { itemsId } = req.params;
  const currentItem = await Items.findById(itemsId);
  res.status(200).json(currentItem);
};
