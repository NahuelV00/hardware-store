import expres from "express";
import dotenv from "dotenv";

//IMPORT ROUTES
import authRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import subCategoryRoutes from "./routes/subCategory.routes";
import productRoutes from "./routes/product.routes";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = expres();
app.use(expres.json());

app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/subcategory", subCategoryRoutes);
app.use("/product", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// COMMIT TEST
