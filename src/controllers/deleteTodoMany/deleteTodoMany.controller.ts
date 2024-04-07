import { RequestHandler } from 'express';
import { db, dbCollection } from '../../db/dbConnection';
import { ObjectId } from 'mongodb';

interface TodoParams {
	ids: string;
}

const validateParams = (params: TodoParams) => {
	if (!params.ids) {
		throw new Error('IDs are required');
	}
};

export const deleteTodoMany: RequestHandler = async (req, res, next) => {
	try {
		const { ids } = req.params as unknown as TodoParams;
		validateParams({ ids });

		const objectIds = ids.split(',').map((id) => new ObjectId(id));
		const query = { _id: { $in: objectIds } };

		await db.collection(dbCollection).deleteMany(query);

		return res.status(200).json({ message: 'Todos has been deleted', ids });
	} catch (error) {
		return res.status(400).json({ message: error });
	}
};
