export default {
	BACKEND: process.env.NODE_ENV === "production" ? "https://trelo-back.herokuapp.com" : "http://localhost:3000",
	DEBOUNCE_SAVE_MS: 2000,
	FORCE_LOADING_MS: 333,
};