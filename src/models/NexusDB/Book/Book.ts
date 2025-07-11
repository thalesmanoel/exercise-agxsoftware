import { model, Schema, Types } from "npm:mongoose@7";

interface IBaseInterface {
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBook extends IBaseInterface {
  title: string
  author: string
  publishedYear: number
}

class BookClass implements IBook {
  title: IBook['title']
  author: IBook['author']
  publishedYear: IBook['publishedYear']

  constructor(book: IBook) {
    this.title = book.title
    this.author = book.author
    this.publishedYear = book.publishedYear
  }
}

export const BookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    default: null,
  },
  author: {
    type: String,
    required: true,
    default: null,
  },
  publishedYear: {
    type: Number,
    required: true,
    default: null,
  },
}, {
  timestamps: true,
})

BookSchema.loadClass(BookClass)

export const BookModel = model<IBook>('Book', BookSchema)