import { Router } from 'express';
import {
	createTodo,
	getTodos,
	updateTodo,
	deleteTodo,
	deleteTodoMany,
} from '../controllers/todos';
const router = Router();

router.post('/', createTodo);
router.get('/', getTodos);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.delete('/many/:ids', deleteTodoMany);

export default router;
