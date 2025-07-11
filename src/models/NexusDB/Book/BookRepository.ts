import { BookSchema, IBook } from './Book.ts'
import mongoose from 'npm:mongoose@7'

const BookModel = mongoose.model('Book', BookSchema);

class BookRepository {
  model: typeof BookModel

  constructor(model = BookModel) {
    this.model = model
  }

  findAll() {
    return this.model.find()
  }

  findById(id: string) {
    return this.model.findById(id)
  }

  create(data: IBook) {
    return this.model.create(data)
  }

  update(id: string, data: Partial<IBook>) {
    return this.model.findByIdAndUpdate(id, data, { new: true })
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id)
  }
}

export const bookRepository = new BookRepository()