import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { connectDatabase } from "../config/db.js";
import Product from "../models/Product.js";
import { buildProductFromFolder } from "../utils/importProduct.js";

dotenv.config();

const categoryLabel = "Beauty And Personal Care";
const categorySlug = "beauty-personal-care";
const sourceRoot = process.env.BEAUTY_PRODUCTS_SOURCE || "D:\\Teerron\\Beauty And Personal Care";
const uploadsRoot = path.resolve(process.cwd(), "public", "uploads", "products");

const runImport = async () => {
  try {
    await connectDatabase();

    const productFolders = (await fs.promises.readdir(sourceRoot, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(sourceRoot, entry.name))
      .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));

    let importedCount = 0;
    let skippedCount = 0;

    for (const folderPath of productFolders) {
      const product = await buildProductFromFolder({
        categoryLabel,
        categorySlug,
        folderPath,
        uploadsRoot,
      });

      if (!product) {
        skippedCount += 1;
        continue;
      }

      await Product.findOneAndUpdate(
        { sku: product.sku },
        product,
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );

      importedCount += 1;
      console.log(`Imported: ${product.name}`);
    }

    console.log(`Import complete. Imported ${importedCount} products, skipped ${skippedCount}.`);
    process.exit(0);
  } catch (error) {
    console.error("Beauty product import failed", error);
    process.exit(1);
  }
};

runImport();
