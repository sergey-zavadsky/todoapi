export const validateText = (text: string) => {
	if (typeof text !== 'string') {
		throw new Error('Text should be type of String');
	}
	if (!text) {
		throw new Error('Text is required');
	}
};
