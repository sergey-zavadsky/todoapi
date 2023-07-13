import express, { RequestHandler } from 'express';
import { ObjectId } from 'mongodb';
import { Todo } from '../models/todo';
import db from '../db/dbConnection';
import '../loadEnvironment';

const dbCollection = process.env.DB_COLLECTION || '';

export const createTodo: RequestHandler = async (req, res, next) => {
	const dbCon = await db();
	try {
		const text = (req.body as { text: string }).text;
		if (!text) {
			return res.status(400).json({ message: 'Text is required' });
		}
		if (typeof text !== 'string') {
			return res.status(400).json({ message: 'Text should be type of String' });
		}

		const date = new Date().toISOString();
		const newTodo = new Todo(date, text);

		await dbCon.сonnection?.collection(dbCollection || '').insertOne(newTodo);

		return res.status(201).json({ message: 'Todo has been created', newTodo });
	} catch (error) {
		return res.status(400).json({ message: error });
	} finally {
		dbCon.client.close();
		console.log('MongoDB disconnected');
	}
};

export const getTodos: RequestHandler = async (req, res, next) => {
	const dbCon = await db();
	try {
		const result = await dbCon.сonnection
			?.collection(dbCollection)
			.find({})
			.limit(50)
			.toArray();

		return res.status(200).json({ ...result });
	} catch (error) {
		return res.status(400).json({ message: error });
	} finally {
		dbCon.client.close();
		console.log('MongoDB disconnected');
	}
};

export const updateTodo: RequestHandler = async (req, res, next) => {
	const dbCon = await db();
	try {
		const text = (req.body as { text: string }).text;
		if (!text) {
			return res.status(400).json({ message: 'Text is required' });
		}
		if (typeof text !== 'string') {
			return res.status(400).json({ message: 'Text should be type of String' });
		}

		const updatedDate = new Date().toISOString();
		// const newTodo = new Todo(date, text);
		const id = new ObjectId(req.params.id as unknown as string);
		const query = { _id: id };
		const updates = {
			$set: { text, updatedDate },
		};

		await dbCon.сonnection?.collection(dbCollection).updateOne(query, updates);

		return res.status(200).json({ message: 'Todo has been updated', text });
	} catch (error) {
		return res.status(400).json({ message: error });
	} finally {
		dbCon.client.close();
		console.log('MongoDB disconnected');
	}
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
	const dbCon = await db();
	try {
		const id = new ObjectId(req.params.id as unknown as string);
		const query = { _id: id };

		await dbCon.сonnection?.collection(dbCollection).deleteOne(query);

		return res.status(200).json({ message: 'Todo has been deleted', query });
	} catch (error) {
		return res.status(400).json({ message: error });
	} finally {
		dbCon.client.close();
		console.log('MongoDB disconnected');
	}
};

export const deleteTodoMany: RequestHandler = async (req, res, next) => {
	const dbCon = await db();
	try {
		const ids = req.params.ids.split(',').map((id) => new ObjectId(id));
		const query = { _id: { $in: ids } };

		await dbCon.сonnection?.collection(dbCollection).deleteMany(query);

		return res.status(200).json({ message: 'Todos has been deleted', query });
	} catch (error) {
		return res.status(400).json({ message: error });
	} finally {
		dbCon.client.close();
		console.log('MongoDB disconnected');
	}
};
