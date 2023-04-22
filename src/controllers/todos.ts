import { RequestHandler } from 'express';
import { Todo } from '../models/todo';
import { v4 as uuidv4 } from 'uuid';

function createUniqueId() {
	return uuidv4();
}

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
	const text = (req.body as { text: string }).text;
	if (!text) {
		res.status(400).json({ message: 'Text is required' });
	}
	if (typeof text !== 'string') {
		res.status(400).json({ message: 'Text should be type of String' });
	}
	const itemID = createUniqueId();
	const newTodo = new Todo(itemID, text);
	TODOS.push(newTodo);

	res
		.status(201)
		.json({ message: 'Todo has been created', createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
	res.status(200).json({ ...TODOS });
};
