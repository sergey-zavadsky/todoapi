export const validateText = (text: any) => {
	if (!text) {
		return { valid: false, message: 'Text is required' };
	}
	if (typeof text !== 'string') {
		return { valid: false, message: 'Text should be type of String' };
	}
	return { valid: true, message: '' };
};
