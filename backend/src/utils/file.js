import { v2 as cloudinary } from "cloudinary";

// Cloudinary public_id extract karta hai URL se
const getPublicId = (url = "") => {
  try {
    // URL example: https://res.cloudinary.com/demo/image/upload/v123/ecommerce/products/abc.jpg
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;
    // version part hata do (v123/)
    const withoutVersion = parts[1].replace(/^v\d+\//, "");
    // extension hata do
    return withoutVersion.replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
};

export const removeCloudinaryFiles = async (urls = []) => {
  const publicIds = urls
    .map(getPublicId)
    .filter(Boolean);

  if (publicIds.length === 0) return;

  await Promise.all(
    publicIds.map(async (publicId) => {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error(`Failed to remove cloudinary file: ${publicId}`, error);
      }
    })
  );
};