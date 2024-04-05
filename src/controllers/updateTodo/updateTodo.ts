import { RequestHandler } from 'express';
import { db, dbCollection } from '../../db/dbConnection';
import { ObjectId } from 'mongodb';
import { validateText, validateIsDone } from '../validations';
import { TodoRequestBody } from '../interfaces/Todo.requestBody.interface';

export const updateTodo: RequestHandler = async (req, res, next) => {
	const dbCon = await db();

	try {
		const { text, isDone } = req.body as TodoRequestBody;

		try {
			validateText(text);
			if (isDone !== undefined) {
				validateIsDone(isDone);
			}
		} catch (error) {
			const message = (error as Error).message;

			return res.status(400).json({ message: message });
		}

		const updatedAt = new Date().toISOString();
		const id = new ObjectId(req.params.id as unknown as string);
		const query = { _id: id };
		const updates = {
			$set: { text, updatedAt, isDone },
		};

		const item = dbCon.сonnection?.collection(dbCollection);

		await item?.updateOne(query, updates);
		const findItem = await item?.findOne(query);

		console.log('MongoDB disconnected');
		dbCon.client.close();

		return res.status(200).json({
			id,
			text,
			updatedAt,
			createdAt: findItem?.createdAt,
			isDone: findItem?.isDone,
		});
	} catch (error) {
		console.log('MongoDB disconnected');
		dbCon.client.close();
		return res.status(400).json({ message: (error as Error).message });
	}
};
