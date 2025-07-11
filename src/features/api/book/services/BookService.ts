import { IBook } from "../../../../models/NexusDB/Book/Book.ts";
import { bookRepository } from "../../../../models/NexusDB/Book/BookRepository.ts";


export class BookService {
  private repository: BookRepository; 

  constructor(repository = bookRepository) {
    this.repository = repository;
  }

  async findAll(): Promise<IBook[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<IBook | null> {
    return await this.repository.findById(id);
  }

  async create(data: IBook): Promise<IBook> {
    return await this.repository.create(data);
  }

  async update(id: string, data: Partial<IBook>): Promise<IBook | null> {
    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<IBook | null> {
    return await this.repository.delete(id);
  }
}