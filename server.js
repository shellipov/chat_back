import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import indexRouter from "./routes/index.js";
import  ws_server from "./sw_server/ws_server.js"

dotenv.config();

const app = express();
 
app.use(express.json());
app.use(cors());

ws_server(app)

app.use("/", indexRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`app listening on port ${PORT}`));
