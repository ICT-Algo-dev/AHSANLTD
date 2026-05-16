import Bag from "../models/Bag.js";

const getOrCreateBag = async (userId) => {
  let bag = await Bag.findOne({ user: userId }).populate("items.product");

  if (!bag) {
    bag = await Bag.create({ user: userId, items: [] });
    bag = await Bag.findById(bag._id).populate("items.product");
  }

  return bag;
};

export const getCart = async (req, res) => {
  const bag = await getOrCreateBag(req.user._id);
  res.json(bag);
};

export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    res.status(400).json({ message: "productId is required" });
    return;
  }

  const bag = await getOrCreateBag(req.user._id);
  const existingItem = bag.items.find((item) => item.product._id.toString() === productId);

  if (existingItem) {
    existingItem.quantity += Number(quantity);
  } else {
    bag.items.push({
      product: productId,
      quantity: Number(quantity),
    });
  }

  await bag.save();
  await bag.populate("items.product");

  res.status(201).json(bag);
};

export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const bag = await getOrCreateBag(req.user._id);
  const item = bag.items.find((cartItem) => cartItem.product._id.toString() === req.params.productId);

  if (!item) {
    res.status(404).json({ message: "Cart item not found" });
    return;
  }

  if (Number(quantity) <= 0) {
    bag.items = bag.items.filter((cartItem) => cartItem.product._id.toString() !== req.params.productId);
  } else {
    item.quantity = Number(quantity);
  }

  await bag.save();
  await bag.populate("items.product");

  res.json(bag);
};

export const removeCartItem = async (req, res) => {
  const bag = await getOrCreateBag(req.user._id);
  bag.items = bag.items.filter((item) => item.product._id.toString() !== req.params.productId);
  await bag.save();
  await bag.populate("items.product");

  res.json(bag);
};

export const clearCart = async (req, res) => {
  const bag = await getOrCreateBag(req.user._id);
  bag.items = [];
  await bag.save();

  res.json(bag);
};
