// import path from "path";
// import fs, { appendFile } from "fs";
import express from "express";
import cors from "cors";
import router from "./router";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
