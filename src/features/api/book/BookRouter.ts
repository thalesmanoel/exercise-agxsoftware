import { Router } from "npm:express@4.18.2";
import * as bookController from './controllers/BookContorller';

const BookRouter = Router();

BookRouter.get("/api/book", bookController.index);
BookRouter.post("/api/book", bookController.create);
BookRouter.get("/api/book/:id", bookController.show);
BookRouter.put("/api/book/:id", bookController.update);
BookRouter.delete("/api/book/:id", bookController.destroy);