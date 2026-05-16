import dotenv from "dotenv";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { seedDefaultProduct } from "./seed.js";

dotenv.config();

const port = Number(process.env.PORT || 5000);

const startServer = async () => {
  try {
    await connectDatabase();
    await seedDefaultProduct();

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
