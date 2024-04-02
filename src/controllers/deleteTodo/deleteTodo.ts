import { RequestHandler } from 'express';
import { db, dbCollection } from '../../db/dbConnection';
import { ObjectId } from 'mongodb';

export const deleteTodo: RequestHandler = async (req, res, next) => {
	const dbCon = await db();
	try {
		const id = new ObjectId(req.params.id as unknown as string);

		const query = { _id: id };
		const item = dbCon.сonnection?.collection(dbCollection);
		const findItem = await item?.findOne(query);

		if (!findItem) {
			dbCon.client.close();

			return res.status(404).json({ message: 'Todo not found' });
		}

		await item?.deleteOne(query);
		dbCon.client.close();

		return res.status(200).json({ id: id, text: findItem.text });
	} catch (error) {
		dbCon.client.close();

		return res.status(400).json({ message: (error as Error).message });
	} finally {
		console.log('MongoDB disconnected');
	}
};
