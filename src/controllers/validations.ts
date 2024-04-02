export const validateText = (text: string) => {
	if (typeof text !== 'string') {
		throw new Error('Text should be type of String');
	}
	if (!text) {
		throw new Error('Text is required');
	}
};

export const validateIsDone = (isDone: boolean) => {
	if (typeof isDone !== 'boolean') {
		throw new Error('isDone should be type of Boolean');
	}
	if (isDone === undefined) {
		throw new Error('isDone is required');
	}
};
