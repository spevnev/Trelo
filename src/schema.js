const schema = {
	username: {
		min: 4,
		max: 25,
	},
	password: {
		min: 4,
		max: 64,
	},
	listTitle: {
		max: 25,
	},
	fileTitle: {
		max: 32,
	},
	boardTitle: {
		max: 30,
	},
	cardTitle: {
		max: 64,
	},
	description: {
		max: 2000,
	},
	files: {
		maxLength: 10,
	},
	images: {
		maxLength: 10,
	},
};

export const validateUsername = (username, displayError) => {
	if (username.length < schema.username.min) {
		displayError(`Username can't be less than ${schema.username.min} characters!`);
		return false;
	}
	if (username.length > schema.username.max) {
		displayError(`Username can't be longer than ${schema.username.max} characters!`);
		return false;
	}

	return true;
};

export const validatePassword = (password, displayError) => {
	if (password.length < schema.password.min) {
		displayError(`Password can't be less than ${schema.password.min} characters!`);
		return false;
	}
	if (password.length > schema.password.max) {
		displayError(`Password can't be longer than ${schema.password.max} characters!`);
		return false;
	}

	return true;
};

export default schema;