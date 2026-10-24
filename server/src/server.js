import "dotenv/config";
import cors from "cors";
import express from "express";
import recommendationsRouter from "./routes/recommendations.js";
import productsRouter from "./routes/products.js";
import customizePackageRouter from "./routes/customizePackage.js";
import ordersRouter from "./routes/orders.js";

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use("/api/recommendations", recommendationsRouter);
app.use("/api/products", productsRouter);
app.use("/api/customize-package", customizePackageRouter);
app.use("/api/orders", ordersRouter);

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", service: "ceremoniq-india-api" });
});

app.listen(port, () => {
  console.log(`Ceremoniq India API listening on port ${port}`);
});

