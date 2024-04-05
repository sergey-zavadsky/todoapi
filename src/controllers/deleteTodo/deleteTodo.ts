import { RequestHandler } from 'express';
import { db, dbCollection } from '../../db/dbConnection';
import { ObjectId } from 'mongodb';

interface TodoParams {
	id: string;
}

const validateParams = (params: TodoParams) => {
	if (!params.id) {
		throw new Error('ID is required');
	}
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
	const dbCon = await db();
	try {
		const { id } = req.params as unknown as TodoParams;
		validateParams({ id });

		const objectId = new ObjectId(id);
		const query = { _id: objectId };
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
