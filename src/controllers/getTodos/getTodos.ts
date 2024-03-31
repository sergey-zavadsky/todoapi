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
		dbCon.client.close();
		return res.status(200).json(result);
	} catch (error) {
		dbCon.client.close();
		return res.status(400).json({ message: error });
	} finally {
		console.log('MongoDB disconnected');
	}
};
