import { RequestHandler } from 'express';
import { db, dbCollection } from '../../db/dbConnection';
import { Todo } from '../../models/todo';
import { validateText } from '../validations';

export const createTodo: RequestHandler = async (req, res, next) => {
	const dbCon = await db();
	try {
		const text = (req.body as { text: string }).text;

		try {
			validateText(text);
		} catch (error) {
			const message = (error as Error).message;

			return res.status(400).json({ message: message });
		}

		const date = new Date().toISOString();
		const newTodo = new Todo(date, text);

		await dbCon.сonnection?.collection(dbCollection).insertOne(newTodo);

		return res.status(201).json(newTodo);
	} catch (error) {
		return res.status(400).json({ message: error });
	} finally {
		dbCon.client.close();
		console.log('MongoDB disconnected');
	}
};
