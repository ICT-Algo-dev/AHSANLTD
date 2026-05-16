import Product from "../models/Product.js";
import { removeCloudinaryFiles } from "../utils/file.js";
import { serializeProduct } from "../utils/productSerializer.js";

const parseJsonField = (value, fallback) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const parseArrayField = (value, fallback) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
};

const getImagePaths = (files = []) => files.map((file) => file.path);

const buildProductPayload = (body, files = []) => {
  const payload = {
    name: body.name,
    brand: body.brand,
    category: body.category,
    sku: body.sku,
    condition: body.condition,
    stockStatus: body.stockStatus,
    description: body.description,
    salePrice: Number(body.salePrice),
    retailPrice: Number(body.retailPrice || 0),
    shippingPrice: Number(body.shippingPrice || 0),
    discountPercentage: Number(body.discountPercentage || 0),
    paymentInfo: body.paymentInfo,
    quantity: Number(body.quantity || 0),
    tags: parseArrayField(body.tags, []),
    sections: parseJsonField(body.sections, []),
  };

  const uploadedImages = getImagePaths(files);
  const bodyImages = parseArrayField(body.images || body.imageUrls, []);

  if (uploadedImages.length > 0) {
    payload.images = uploadedImages;
  } else if (bodyImages.length > 0) {
    payload.images = bodyImages;
  }

  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );
};

export const getProducts = async (req, res) => {
  const { category, search, shuffle, limit } = req.query;
  const query = {};

  if (category && category !== "all") {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  let products = await Product.find(query).sort({ createdAt: -1 });

  if (shuffle === "true") {
    products = [...products].sort(() => Math.random() - 0.5);
  }

  const parsedLimit = Number(limit);
  if (Number.isFinite(parsedLimit) && parsedLimit > 0) {
    products = products.slice(0, parsedLimit);
  }

  res.json(products.map((product) => serializeProduct(req, product)));
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json(serializeProduct(req, product));
};

export const createProduct = async (req, res) => {
  const payload = buildProductPayload(req.body, req.files);
  const product = await Product.create(payload);

  res.status(201).json(serializeProduct(req, product));
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    await removeCloudinaryFiles(getImagePaths(req.files));
    res.status(404).json({ message: "Product not found" });
    return;
  }

  const payload = buildProductPayload(req.body, req.files);
  const keepExistingImages = parseJsonField(req.body.keepImages, product.images);

  if (req.files?.length) {
    payload.images = [...keepExistingImages, ...getImagePaths(req.files)];
  } else if (Array.isArray(keepExistingImages)) {
    payload.images = keepExistingImages;
  }

  const removedImages = product.images.filter((image) => !(payload.images || []).includes(image));

  Object.assign(product, payload);
  await product.save();
  await removeCloudinaryFiles(removedImages);

  res.json(serializeProduct(req, product));
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  await Product.deleteOne({ _id: product._id });
  await removeCloudinaryFiles(product.images);

  res.json({ message: "Product deleted successfully" });
};
