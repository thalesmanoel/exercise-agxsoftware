import express from "npm:express";
import "./config/mongo.ts"; 
import { BookRouter } from "./features/api/book/BookRouter.ts";

const app = express();

app.use(express.json());

app.use(BookRouter);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
