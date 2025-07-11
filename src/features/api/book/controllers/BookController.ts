import { Request, Response, NextFunction } from 'npm:express@4.18.2';
import { Types } from 'npm:mongoose';
import { BookService } from '../services/BookService.ts';
import requestCheckModule from 'npm:request-check';
const requestCheck = requestCheckModule.default;

console.log(requestCheck);

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
      const rc = requestCheck();
      rc.addRule('id', {
        validator: (id: string) => Types.ObjectId.isValid(id),
        message: 'ID inválido',
      });
      const errors = rc.check(
        { id: req.params.id },
        { id: req.params.id }
      );

      if (errors) return res.send_badRequest('Parâmetro inválido.', { errors });

      const book = await this.bookService.findById(req.params.id);
      if (!book) return res.send_notFound('Livro não encontrado.', { id: req.params.id });

      return res.send_ok('Livro encontrado.', { book });
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rc = requestCheck();
      rc.addRule('title', { validator: v => typeof v === 'string', message: 'Título inválido' });
      rc.addRule('author', { validator: v => typeof v === 'string', message: 'Autor inválido' });
      rc.addRule('publishedYear', { validator: v => Number.isInteger(v), message: 'Ano de publicação inválido' });
      const errors = rc.check(
        { title: req.body.title, author: req.body.author, publishedYear: req.body.publishedYear },
        { title: req.body.title },
        { author: req.body.author },
        { publishedYear: req.body.publishedYear }
      );

      if (errors) return res.send_badRequest('Dados inválidos.', { errors });

      const book = await this.bookService.create(req.body);
      return res.send_created('Livro criado com sucesso.', { _id: book._id });
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rc = requestCheck();
      rc.addRule('id', { validator: v => Types.ObjectId.isValid(v), message: 'ID inválido' });
      const errorsId = rc.check({ id: req.params.id }, { id: req.params.id });
      if (errorsId) return res.send_badRequest('Parâmetro inválido.', { errors: errorsId });

      const { title, author, publishedYear } = req.body;
      const rc2 = requestCheck();
      title !== undefined && rc2.addRule('title', { validator: v => typeof v === 'string', message: 'Título inválido' });
      author !== undefined && rc2.addRule('author', { validator: v => typeof v === 'string', message: 'Autor inválido' });
      publishedYear !== undefined && rc2.addRule('publishedYear', { validator: v => Number.isInteger(v), message: 'Ano inválido' });

      const errorsBody = rc2.check(
        ...(title !== undefined ? [{ title }] : []),
        ...(author !== undefined ? [{ author }] : []),
        ...(publishedYear !== undefined ? [{ publishedYear }] : [])
      );

      if (errorsBody) return res.send_badRequest('Dados inválidos para atualização.', { errors: errorsBody });

      const updated = await this.bookService.update(req.params.id, req.body);
      if (!updated) return res.send_notFound('Livro não encontrado para atualização.', { id: req.params.id });

      return res.send_ok('Livro atualizado com sucesso.', { updated });
    } catch (err) {
      next(err);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rc = requestCheck();
      rc.addRule('id', { validator: v => Types.ObjectId.isValid(v), message: 'ID inválido' });
      const errors = rc.check({ id: req.params.id }, { id: req.params.id });
      if (errors) return res.send_badRequest('Parâmetro inválido.', { errors });

      const deleted = await this.bookService.delete(req.params.id);
      if (!deleted) return res.send_notFound('Livro não encontrado para exclusão.', { id: req.params.id });

      return res.send_ok('Livro removido com sucesso.', { deleted });
    } catch (err) {
      next(err);
    }
  };
}

const bookController = new BookController();
export { bookController };
