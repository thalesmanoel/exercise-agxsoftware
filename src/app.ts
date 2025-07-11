import express from "npm:express@4.18.2";
import "./config/mongo.ts"; 
import { BookRouter } from "./features/api/book/BookRouter.ts";
import responser from 'npm:responser@1'
import morgan from 'npm:morgan@1.10.0';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(responser.default);
app.use(BookRouter);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
