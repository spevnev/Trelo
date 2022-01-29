import axios from "axios";
import {getBoard} from "./board";
import {getCards} from "./cards";
import {fetchData, login, signup} from "./user";
import {getToken} from "./jwt";

const client = axios.create({baseURL: "http://localhost:3000/api/"});

client.interceptors.request.use(req => {
	const token = getToken();
	if (token !== null) req.headers.authorization = token;

	return req;
});

export default () => ({
	board: {
		getBoard: getBoard(client),
	}, card: {
		getCards: getCards(client),
	}, user: {
		signup: signup(client), login: login(client), fetchData: fetchData(client),
	},
});