import Product from "../models/Product.js";

const formatCategoryLabel = (category) =>
  category
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const getCategories = async (_req, res) => {
  const categories = await Product.distinct("category");

  res.json(
    categories
      .filter(Boolean)
      .sort()
      .map((slug) => ({
        slug,
        label: formatCategoryLabel(slug),
      }))
  );
};
