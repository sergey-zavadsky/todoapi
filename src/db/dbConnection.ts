import { MongoClient } from 'mongodb';
import '../loadEnvironment';

const connectionString = process.env.ATLAS_URI;

const db = async () => {
	const client = new MongoClient(connectionString || '');
	let сonnection;
	try {
		const connected = await client.connect();
		console.log('Connected to MongoDB');
		сonnection = connected.db('todos');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
	}
	return { сonnection, client };
};

const dbCollection = process.env.DB_COLLECTION || '';

export { db, dbCollection };
