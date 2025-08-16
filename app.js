import mainRoutes from "./main.routes.js"
import express from "express"
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", mainRoutes);

export default app;