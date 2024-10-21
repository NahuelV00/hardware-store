import expres from "express";
import dotenv from "dotenv";

//IMPORT ROUTES
import authRoutes from "./routes/user.routes";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = expres();
app.use(expres.json());

app.use("/api", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
