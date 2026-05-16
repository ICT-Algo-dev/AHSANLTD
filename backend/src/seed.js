import Product from "./models/Product.js";

export const seedDefaultProduct = async () => {
  const existingProduct = await Product.findOne({ sku: "887167485525" });

  if (existingProduct) {
    return;
  }

  const productCount = await Product.countDocuments();
  if (productCount > 0) {
    return;
  }

  await Product.create({
    name: "Estee Lauder - Advanced Night Repair Synchronized Multi-Recovery Complex 100ml/3.4oz",
    brand: "Estee Lauder",
    category: "beauty-personal-care",
    sku: "887167485525",
    condition: "New",
    stockStatus: "In Stock",
    description:
      "Advanced Night Repair serum with multi-recovery support. Seeded from the provided product document so your frontend has real local data to display.",
    salePrice: 99.99,
    retailPrice: 215,
    shippingPrice: 5.99,
    discountPercentage: 53,
    paymentInfo: "4 interest-free payments or as low as $18/mo with Affirm.",
    quantity: 10,
    tags: ["beauty", "personal-care", "serum", "skincare", "estee-lauder"],
    images: [
      "/uploads/products/beauty-personal-care/01-01.jpg",
      "/uploads/products/beauty-personal-care/01-02.jpg",
      "/uploads/products/beauty-personal-care/01-03.jpg",
    ],
    sections: [
      {
        title: "Pricing",
        items: [
          { label: "Retail", value: "$215.00" },
          { label: "Sale Price", value: "$99.99" },
          { label: "Discount", value: "53% Off" },
        ],
      },
      {
        title: "Inventory",
        items: [
          { label: "Stock Status", value: "In Stock" },
          { label: "Condition", value: "New" },
          { label: "Item No.", value: "887167485525" },
        ],
      },
      {
        title: "Shipping & Payment",
        items: [
          { label: "Shipping", value: "$5.99 Shipped" },
          { label: "Payment Option", value: "4 interest-free payments or as low as $18/mo with Affirm." },
        ],
      },
    ],
  });
};
