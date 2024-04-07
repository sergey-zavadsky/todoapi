import { RequestHandler } from 'express';
import { db, dbCollection } from '../../db/dbConnection';

export const getTodos: RequestHandler = async (req, res, next) => {
	const dbCon = await db();
	try {
		const result = await dbCon.сonnection
			?.collection(dbCollection)
			.find({})
			.limit(50)
			.toArray();
		return res.status(200).json(result);
	} catch (error) {
		return res.status(400).json({ message: error });
	} finally {
		dbCon.client.close();
		console.log('MongoDB disconnected');
	}
};
