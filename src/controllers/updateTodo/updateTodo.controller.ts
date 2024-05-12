import { RequestHandler } from 'express';
import { db, dbCollection } from '../../db/dbConnection';
import { ObjectId } from 'mongodb';
import { validateText, validateIsDone } from '../validations';
import { TodoRequestBody } from '../interfaces/todo.requestBody.interface';

export const updateTodo: RequestHandler = async (req, res, next) => {
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
		const query = { _id: id, userId: req.userId };

		const item = db.collection(dbCollection);

		const findItem = await item?.findOne(query);

		if (!findItem) {
			return res.status(404).json({ message: 'Todo not found' });
		}

		const updateIsDone = isDone !== undefined ? isDone : findItem.isDone;
		const updates = {
			$set: { text, updatedAt, isDone: updateIsDone },
		};

		await item?.updateOne(query, updates);

		return res.status(200).json({
			id,
			text,
			updatedAt,
			createdAt: findItem?.createdAt,
			isDone: findItem?.isDone,
		});
	} catch (error) {
		return res.status(400).json({ message: (error as Error).message });
	}
};
