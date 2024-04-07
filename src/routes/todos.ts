import { Router } from 'express';
import { deleteTodoMany } from '../controllers/deleteTodoMany/deleteTodoMany.controller';
import { getTodos } from '../controllers/getTodos/getTodos.controller';
import { createTodo } from '../controllers/createTodo/createTodo.controller';
import { updateTodo } from '../controllers/updateTodo/updateTodo.controller';
import { deleteTodo } from '../controllers/deleteTodo/deleteTodo.controller';

const router = Router();

router.post('/', createTodo);
router.get('/', getTodos);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.delete('/many/:ids', deleteTodoMany);

export default router;
