export const serializeProduct = (req, product) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const productObject = product.toObject ? product.toObject() : product;

  const imageUrls = (productObject.images || []).map((imagePath) =>
    imagePath.startsWith("http") ? imagePath : `${baseUrl}${imagePath}`
  );

  return {
    ...productObject,
    imageUrls,
    primaryImage: imageUrls[0] || "",
  };
};
