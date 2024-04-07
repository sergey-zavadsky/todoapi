import { MongoClient, Db } from 'mongodb';
import '../loadEnvironment';

const connectionString = process.env.ATLAS_URI;
const dbCollection = process.env.DB_COLLECTION || '';
const dbName = process.env.DB_NAME || '';
const client = new MongoClient(connectionString || '');

let db: Db;

(async () => {
	try {
		const connection = await client.connect();
		db = connection.db(dbName);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
	}
})();

export { db, dbCollection };
