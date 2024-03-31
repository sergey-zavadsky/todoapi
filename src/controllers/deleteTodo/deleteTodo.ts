import { RequestHandler } from 'express';
import { db, dbCollection } from '../../db/dbConnection';
import { ObjectId } from 'mongodb';

export const deleteTodo: RequestHandler = async (req, res, next) => {
	const dbCon = await db();
	try {
		const id = new ObjectId(req.params.id as unknown as string);
		const query = { _id: id };

		await dbCon.сonnection?.collection(dbCollection).deleteOne(query);
		dbCon.client.close();

		return res.status(200).json({ message: 'Todo has been deleted', id });
	} catch (error) {
		dbCon.client.close();

		return res.status(400).json({ message: error });
	} finally {
		console.log('MongoDB disconnected');
	}
};
