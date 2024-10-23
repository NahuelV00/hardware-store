import expres from "express";
import dotenv from "dotenv";

//IMPORT ROUTES
import authRoutes from "./routes/user.routes";
import categoryRouter from "./routes/category.routes";
import subcategory from "./routes/subCategory.routes";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = expres();
app.use(expres.json());

app.use("/auth", authRoutes);
app.use("/category", categoryRouter);
app.use("/subcategory", subcategory);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
