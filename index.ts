import router from "./src/routers/router";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(cookieParser());
// app.use(passport.initialize());

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
