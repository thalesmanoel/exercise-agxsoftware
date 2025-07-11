import { Request, Response, NextFunction } from 'npm:express';
import { Types } from 'npm:mongoose';
import { BookService } from '../services/BookService.ts';

class BookController {
  private bookService: BookService;

  constructor({ bookService = new BookService() } = {}) {
    this.bookService = bookService;
  }

  index = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await this.bookService.findAll();
      return res.status(200).json({ success: true, message: 'Livros encontrados.', data: books });
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'ID inválido.', data: { id } });
      }

      const book = await this.bookService.findById(id);
      if (!book) {
        return res.status(404).json({ success: false, message: 'Livro não encontrado.', data: { id } });
      }

      return res.status(200).json({ success: true, message: 'Livro encontrado.', data: book });
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await this.bookService.create(req.body);
      return res.status(201).json({ success: true, message: 'Livro criado com sucesso.', data: { _id: book._id } });
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'ID inválido.', data: { id } });
      }

      const updated = await this.bookService.update(id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Livro não encontrado para atualização.', data: { id } });
      }

      return res.status(200).json({ success: true, message: 'Livro atualizado com sucesso.', data: updated });
    } catch (err) {
      next(err);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'ID inválido.', data: { id } });
      }

      const deleted = await this.bookService.delete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Livro não encontrado para exclusão.', data: { id } });
      }

      return res.status(200).json({ success: true, message: 'Livro removido com sucesso.', data: deleted });
    } catch (err) {
      next(err);
    }
  };
}

const bookController = new BookController();
export { bookController };
