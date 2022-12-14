import router from "./src/routers/router";
import express from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const app = express();

const corsOptions: CorsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
