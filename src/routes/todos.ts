import { Router } from 'express';
import { deleteTodoMany } from '../controllers/deleteTodoMany/deleteTodoMany';
import { getTodos } from '../controllers/getTodos/getTodos';
import { createTodo } from '../controllers/createTodo/createTodo';
import { updateTodo } from '../controllers/updateTodo/updateTodo';
import { deleteTodo } from '../controllers/deleteTodo/deleteTodo';

const router = Router();

router.post('/', createTodo);
router.get('/', getTodos);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.delete('/many/:ids', deleteTodoMany);

export default router;
