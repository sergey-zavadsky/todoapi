export class Todo {
	constructor(
		public createdAt: string,
		public text: string,
		public isDone: boolean = false,
		public userId?: string,
	) {}
}
