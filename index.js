import { createServer } from "http"
import app from "./app.js";

const server = createServer(app);

const PORT=9300;

server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})