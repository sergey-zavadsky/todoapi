import { RequestHandler } from 'express';
import { db, dbCollection } from '../../db/dbConnection';
import { Todo } from '../../models/todo';
import { validateIsDone, validateText } from '../validations';
import { TodoRequestBody } from '../interfaces/todo.requestBody.interface';

const validateRequestBody = (body: TodoRequestBody) => {
	validateText(body.text);

	if (body.isDone !== undefined) {
		validateIsDone(body.isDone);
	}
};

export const createTodo: RequestHandler = async (req, res, next) => {
	try {
		const { text, isDone } = req.body as TodoRequestBody;

		try {
			validateRequestBody({ text, isDone });
		} catch (error) {
			const message = (error as Error).message;

			return res.status(400).json({ message: message });
		}

		const date = new Date().toISOString();
		const userId = req.userId;
		const newTodo = new Todo(date, text, isDone, userId);

		const result = await db.collection(dbCollection).insertOne(newTodo);
		const responseTodo = {
			_id: result.insertedId,
			date: newTodo.createdAt,
			text: newTodo.text,
			isDone: newTodo.isDone,
		};

		return res.status(201).json(responseTodo);
	} catch (error) {
		return res.status(400).json({ message: error });
	}
};
