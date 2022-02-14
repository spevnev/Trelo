import {changeBoard, createBoard, deleteBoard, getBoard} from "./board";
import {addCard, changeCard, deleteCard, getCards} from "./card";
import {addUser, changeBoards, changeRole, deleteUser, fetchData, leave, login, signup} from "./user";
import {downloadFile, downloadImage, getImage, uploadFile, uploadImage} from "./file";
import {getToken} from "./jwt";
import axios from "axios";

const client = axios.create({baseURL: "http://localhost:3000/api/"});

client.interceptors.request.use(req => {
	const token = getToken();
	if (token !== null) req.headers.authorization = token;

	return req;
});


export default {
	board: {
		getBoard: getBoard(client),
		deleteBoard: deleteBoard(client),
		changeBoard: changeBoard(client),
		createBoard: createBoard(client),
	}, card: {
		getCards: getCards(client),
		changeCard: changeCard(client),
		addCard: addCard(client),
		deleteCard: deleteCard(client),
	}, user: {
		signup: signup(client),
		login: login(client),
		fetchData: fetchData(client),
		addUser: addUser(client),
		deleteUser: deleteUser(client),
		changeRole: changeRole(client),
		changeBoards: changeBoards(client),
		leave: leave(client),
	}, file: {
		uploadFile: uploadFile(client),
		uploadImage: uploadImage(client),
		getImage: getImage(client),
		downloadFile: downloadFile(client),
		downloadImage: downloadImage(client),
	},
};