const config =
	process.env.NODE_ENV === "production" ?
		{
			BACKEND: "https://trelo-back.herokuapp.com",
			DEBOUNCE_SAVE_MS: 2000,
			FORCE_LOADING_MS: 400,
		} : {
			BACKEND: "http://localhost:3000",
			DEBOUNCE_SAVE_MS: 500,
			FORCE_LOADING_MS: 100,
		};

export default config;