import express, { Request, Response, NextFunction } from 'express';
import todosRoutes from './routes/todos';
import { json } from 'body-parser';

const app = express();

app.use(json());
app.use('/api/v1/todos', todosRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(400).json({ message: err.message });
});

app.listen(3000);
