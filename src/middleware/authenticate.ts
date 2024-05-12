import admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import { service_account } from './service_account';

admin.initializeApp({
	credential: admin.credential.cert({
		projectId: service_account.project_id,
		clientEmail: service_account.client_email,
		privateKey: service_account.private_key,
	}),
});

interface RequestWithUser extends Request {
	user?: admin.auth.DecodedIdToken;
	userId?: string;
}

export const authenticate = async (
	req: RequestWithUser,
	res: Response,
	next: NextFunction,
) => {
	const headerToken = req.headers.authorization;
	if (!headerToken) {
		return res.status(401).send({ message: 'No token provided' });
	}

	if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
		return res.status(401).send({ message: 'Invalid token format' });
	}

	const token = headerToken.split(' ')[1];

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		req.user = decodedToken;
		req.userId = decodedToken.uid;
		next();
	} catch (error) {
		console.error('Error verifying auth token:', error);
		res.status(403).send({ message: 'Unauthorized' });
	}
};
