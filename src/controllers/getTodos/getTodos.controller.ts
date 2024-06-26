import { RequestHandler } from 'express';
import { db, dbCollection } from '../../db/dbConnection';

export const getTodos: RequestHandler = async (req, res, next) => {
	try {
		const result = await db
			.collection(dbCollection)
			.find({ userId: req.userId })
			.limit(50)
			.toArray();
		return res.status(200).json(result);
	} catch (error) {
		return res.status(400).json({ message: error });
	}
};
