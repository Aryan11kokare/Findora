import dotenv from "dotenv";

if (process.env.NODE_ENV != "production") {
  dotenv.config();
}
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/user.js";
import itemRoutes from "./routes/item.js";
import commentRoutes from "./routes/comments.js";

const app = express();

main()
  .then(() => {
    console.log("connected with Database");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.json("working");
});

app.use(userRoutes);
app.use(itemRoutes);
app.use(commentRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
