import { RequestHandler } from 'express';
import { db, dbCollection } from '../../db/dbConnection';
import { ObjectId } from 'mongodb';

export const deleteTodoMany: RequestHandler = async (req, res, next) => {
	const dbCon = await db();
	try {
		const ids = req.params.ids.split(',').map((id) => new ObjectId(id));
		const query = { _id: { $in: ids } };

		await dbCon.сonnection?.collection(dbCollection).deleteMany(query);

		return res.status(200).json({ message: 'Todos has been deleted', ids });
	} catch (error) {
		return res.status(400).json({ message: error });
	} finally {
		dbCon.client.close();
		console.log('MongoDB disconnected');
	}
};
