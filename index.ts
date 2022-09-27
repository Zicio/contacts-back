import router from "./src/router";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
