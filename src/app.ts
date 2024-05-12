import express, { Request, Response, NextFunction } from 'express';
import todosRoutes from './routes/todos';
import { json } from 'body-parser';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerUiConfig } from './config';
import { authenticate } from './middleware/authenticate';

const app = express();
const swaggerSpec = swaggerJsDoc(swaggerUiConfig);

app.use(cors());
app.use(json());
app.use('/api/v1/todos', authenticate, todosRoutes);
app.use('/api/v1/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(400).json({ message: err.message });
});

app.listen(3000, () => {
	console.log('Server is running at http://localhost:3000');
});
