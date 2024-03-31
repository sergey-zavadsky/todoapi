import { RequestHandler } from 'express';
import { db, dbCollection } from '../../db/dbConnection';
import { ObjectId } from 'mongodb';

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

		const updatedAt = new Date().toISOString();
		const id = new ObjectId(req.params.id as unknown as string);
		const query = { _id: id };
		const updates = {
			$set: { text, updatedAt },
		};

		const item = dbCon.сonnection?.collection(dbCollection);
		const findItem = await item?.findOne(query);
		await item?.updateOne(query, updates);

		console.log('MongoDB disconnected');
		dbCon.client.close();

		return res
			.status(200)
			.json({ id, text, updatedAt, createdAt: findItem?.createdAt });
	} catch (error) {
		console.log('MongoDB disconnected');
		dbCon.client.close();
		return res.status(400).json({ message: error });
	}
};
