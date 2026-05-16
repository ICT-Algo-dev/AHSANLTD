import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { uploadProductImages } from "../middleware/upload.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", requireAuth, requireAdmin, uploadProductImages.array("images", 8), createProduct);
router.put("/:id", requireAuth, requireAdmin, uploadProductImages.array("images", 8), updateProduct);
router.delete("/:id", requireAuth, requireAdmin, deleteProduct);

export default router;
