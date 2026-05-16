import fs from "fs";
import path from "path";
import { extractPlainTextFromDocx } from "./docx.js";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const extractPriceNumber = (value, fallback = 0) => {
  const match = value?.match(/(\d[\d,]*\.?\d{0,2})/);
  return match ? Number(match[1].replace(/,/g, "")) : fallback;
};

const titleCase = (value) =>
  value
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");

const normalizeDocText = (rawText) =>
  rawText
    .replace(/Item No\./g, "\nItem No.")
    .replace(/Condition:/g, "\nCondition:")
    .replace(/Retail\$/g, "\nRetail$")
    .replace(/Graduation Sale/g, "\nGraduation Sale")
    .replace(/4 interest-free payments/g, "\n4 interest-free payments")
    .replace(/Enjoy Free Shipping/g, "\nEnjoy Free Shipping")
    .replace(/Shipped/g, "Shipped\n")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\n+/g, "\n")
    .trim();

const getLines = (text) => normalizeDocText(text).split("\n").map((line) => line.trim()).filter(Boolean);

const extractProductName = (lines) => {
  const firstLine = lines[0] || "";
  return firstLine
    .replace(/Item No\..*$/i, "")
    .replace(/\s{2,}/g, " ")
    .trim();
};

const extractBrand = (productName) => {
  if (productName.includes("-")) {
    return productName.split("-")[0].trim();
  }

  const words = productName.split(" ").filter(Boolean);
  return titleCase(words.slice(0, Math.min(3, words.length)).join(" "));
};

const buildSections = ({
  retailPriceText,
  salePriceText,
  discountText,
  stockStatus,
  condition,
  sku,
  shippingText,
  paymentInfo,
}) => {
  const sections = [];

  sections.push({
    title: "Pricing",
    items: [
      { label: "Retail", value: retailPriceText || "$0.00" },
      { label: "Sale Price", value: salePriceText || "$0.00" },
      { label: "Discount", value: discountText || "0% Off" },
    ],
  });

  sections.push({
    title: "Inventory",
    items: [
      { label: "Stock Status", value: stockStatus || "In Stock" },
      { label: "Condition", value: condition || "New" },
      { label: "Item No.", value: sku || "" },
    ],
  });

  sections.push({
    title: "Shipping & Payment",
    items: [
      { label: "Shipping", value: shippingText || "Shipping info not available" },
      { label: "Payment Option", value: paymentInfo || "Payment info not available" },
    ],
  });

  return sections;
};

export const buildProductFromFolder = async ({
  categoryLabel,
  categorySlug,
  folderPath,
  uploadsRoot,
}) => {
  const entries = await fs.promises.readdir(folderPath, { withFileTypes: true });
  const docxFile = entries.find((entry) => entry.isFile() && path.extname(entry.name).toLowerCase() === ".docx");
  const imageFiles = entries
    .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));

  if (!docxFile) {
    return null;
  }

  const sourceDocxPath = path.join(folderPath, docxFile.name);
  const rawText = extractPlainTextFromDocx(sourceDocxPath);
  const lines = getLines(rawText);
  const normalizedText = lines.join("\n");

  const folderName = path.basename(folderPath);
  const productName = extractProductName(lines);
  const brand = extractBrand(productName);
  const skuMatch = normalizedText.match(/Item No\.\s*([A-Za-z0-9-]+)/i);
  const retailMatch = normalizedText.match(/Retail\$\s*([\d,]+\.\d{2})/i);
  const saleMatch = normalizedText.match(/Graduation Sale\s*\$?\s*([\d,]+\.\d{2})/i);
  const discountMatch = normalizedText.match(/(\d+)%\s*Off/i);
  const conditionMatch = normalizedText.match(/Condition:\s*([^\n]+)/i);
  const paymentMatch = normalizedText.match(/(4 interest-free payments[^\n]+)/i);
  const shippingLine = lines.find((line) => /shipped|free shipping/i.test(line)) || "";
  const stockStatus = /OUT OF STOCK/i.test(normalizedText) ? "Out of Stock" : "In Stock";

  const categoryUploadDir = path.join(uploadsRoot, categorySlug);
  await fs.promises.mkdir(categoryUploadDir, { recursive: true });

  const copiedImages = [];
  for (const imageFile of imageFiles) {
    const extension = path.extname(imageFile).toLowerCase();
    const imageBaseName = slugify(path.basename(imageFile, extension)) || slugify(productName) || folderName;
    const targetFileName = `${folderName}-${imageBaseName}${extension}`;
    const sourceImagePath = path.join(folderPath, imageFile);
    const targetImagePath = path.join(categoryUploadDir, targetFileName);
    await fs.promises.copyFile(sourceImagePath, targetImagePath);
    copiedImages.push(`/uploads/products/${categorySlug}/${targetFileName}`);
  }

  const retailPriceText = retailMatch ? `$${retailMatch[1]}` : "$0.00";
  const salePriceText = saleMatch ? `$${saleMatch[1]}` : retailPriceText;
  const discountText = discountMatch ? `${discountMatch[1]}% Off` : "0% Off";
  const paymentInfo = paymentMatch ? paymentMatch[1].trim() : "";
  const description =
    `${productName} from ${categoryLabel}. Imported from the source Word document and local product images.`.trim();

  return {
    name: productName,
    brand,
    category: categorySlug,
    sku: skuMatch ? skuMatch[1] : `${categorySlug}-${folderName}`,
    condition: conditionMatch ? conditionMatch[1].trim() : "New",
    stockStatus,
    description,
    salePrice: extractPriceNumber(salePriceText),
    retailPrice: extractPriceNumber(retailPriceText),
    shippingPrice: /free shipping/i.test(shippingLine) ? 0 : extractPriceNumber(shippingLine),
    discountPercentage: discountMatch ? Number(discountMatch[1]) : 0,
    paymentInfo,
    quantity: stockStatus === "In Stock" ? 10 : 0,
    tags: Array.from(
      new Set([
        categorySlug,
        ...slugify(brand).split("-"),
        ...slugify(productName).split("-").slice(0, 8),
      ].filter(Boolean))
    ),
    images: copiedImages,
    sections: buildSections({
      retailPriceText,
      salePriceText,
      discountText,
      stockStatus,
      condition: conditionMatch ? conditionMatch[1].trim() : "New",
      sku: skuMatch ? skuMatch[1] : `${categorySlug}-${folderName}`,
      shippingText: shippingLine || "Shipping info not available",
      paymentInfo,
    }),
  };
};
