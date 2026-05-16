import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    items: [
      {
        label: {
          type: String,
          required: true,
          trim: true,
        },
        value: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      trim: true,
      default: "beauty-personal-care",
    },
    sku: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    condition: {
      type: String,
      trim: true,
      default: "New",
    },
    stockStatus: {
      type: String,
      trim: true,
      default: "In Stock",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    salePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    retailPrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    discountPercentage: {
      type: Number,
      min: 0,
      default: 0,
    },
    paymentInfo: {
      type: String,
      trim: true,
      default: "",
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    sections: {
      type: [sectionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Product", productSchema);
