import express, { RequestHandler } from 'express';
import { Todo } from '../models/todo';
import { v4 as uuidv4 } from 'uuid';
import db from '../db/dbConnection';

function createUniqueId() {
	return uuidv4();
}

export const createTodo: RequestHandler = async (req, res, next) => {
	const dbCon = await db();
	try {
		const text = (req.body as { text: string }).text;
		if (!text) {
			res.status(400).json({ message: 'Text is required' });
		}
		if (typeof text !== 'string') {
			res.status(400).json({ message: 'Text should be type of String' });
		}
		const itemID = createUniqueId();
		const newTodo = new Todo(itemID, text);

		const result = await dbCon.сonnection
			?.collection('todosList')
			.insertOne(newTodo);

		res.status(201).json({ message: 'Todo has been created', newTodo });
	} catch (error) {
		res.status(400).json({ error: error });
	} finally {
		dbCon.client.close();
		console.log('MongoDB disconnected');
	}
};

export const getTodos: RequestHandler = async (req, res, next) => {
	const dbCon = await db();
	try {
		const result = await dbCon.сonnection
			?.collection('todosList')
			.find({})
			.limit(50)
			.toArray();

		res.status(200).json({ ...result });
	} catch (error) {
		res.status(400).json({ error: error });
	} finally {
		dbCon.client.close();
		console.log('MongoDB disconnected');
	}
};
