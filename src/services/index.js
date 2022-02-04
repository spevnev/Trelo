import axios from "axios";
import {changeBoard, createBoard, deleteBoard, getBoard} from "./board";
import {changeCard, getCards} from "./cards";
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
		getBoard: getBoard(client), deleteBoard: deleteBoard(client), changeBoard: changeBoard(client), createBoard: createBoard(client),
	}, card: {
		getCards: getCards(client), changeCard: changeCard(client),
	}, user: {
		signup: signup(client), login: login(client), fetchData: fetchData(client),
	},
});