import express, { Request, Response, NextFunction } from 'express';
import todosRoutes from './routes/todos';
import { json } from 'body-parser';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerUiConfig = {
	definition: {
		openapi: '3.1.0',
		info: {
			title: 'TODO list API',
			version: '0.1.0',
			description:
				'This is a simple todo list api application which was made for educational purposes.',
			license: {
				name: 'MIT',
				url: 'https://github.com/sergey-zavadsky/bucketlist.github.io/blob/master/LICENSE',
			},
			contact: {
				name: 'TODO',
				url: 'https://sergey-zavadsky.github.io/bucketlist.github.io/',
				email: 'siarhei.zavadski@email.com',
			},
		},
		servers: [
			{
				url: 'http://localhost:3000/api/v1/',
			},
		],
	},

	apis: ['src/routes/*.yaml'],
};

const app = express();
const swaggerSpec = swaggerJsDoc(swaggerUiConfig);

app.use(cors());
app.use(json());
app.use('/api/v1/todos', todosRoutes);
app.use('/api/v1/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(400).json({ message: err.message });
});

app.listen(3000, () => {
	console.log('Server is running at http://localhost:3000');
});
