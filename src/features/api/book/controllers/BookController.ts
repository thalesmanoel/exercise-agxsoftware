import { Request, Response, NextFunction } from 'npm:express@4.18.2';
import { Types } from 'npm:mongoose';
import { BookService } from '../services/BookService.ts';

class BookController {
  private bookService = new BookService();

  index = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await this.bookService.findAll();
      return res.send_ok('Livros encontrados.', { books });
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!Types.ObjectId.isValid(id)) {
        return res.send_badRequest('ID inválido.', { id });
      }

      const book = await this.bookService.findById(id);
      if (!book) {
        return res.send_notFound('Livro não encontrado.', { id });
      }

      return res.send_ok('Livro encontrado.', { book });
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await this.bookService.create(req.body);
      return res.send_created('Livro criado com sucesso.', { _id: book._id });
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!Types.ObjectId.isValid(id)) {
        return res.send_badRequest('ID inválido.', { id });
      }

      const updated = await this.bookService.update(id, req.body);
      if (!updated) {
        return res.send_notFound('Livro não encontrado para atualização.', { id });
      }

      return res.send_ok('Livro atualizado com sucesso.', { updated });
    } catch (err) {
      next(err);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!Types.ObjectId.isValid(id)) {
        return res.send_badRequest('ID inválido.', { id });
      }

      const deleted = await this.bookService.delete(id);
      if (!deleted) {
        return res.send_notFound('Livro não encontrado para exclusão.', { id });
      }

      return res.send_ok('Livro removido com sucesso.', { deleted });
    } catch (err) {
      next(err);
    }
  };
}

const bookController = new BookController();
export { bookController };
