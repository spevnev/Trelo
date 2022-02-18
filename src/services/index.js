import {addUser, changeList, changeRole, changeTitle, createBoard, createList, deleteBoard, deleteList, deleteUser, getBoard} from "./board";
import {addCard, addFile, changeCard, deleteCard, deleteFile, getCards, renameFile} from "./card";
import {changeBoards, fetchData, leave, login, signup} from "./user";
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
		createBoard: createBoard(client),
		createList: createList(client),
		addUser: addUser(client),
		changeTitle: changeTitle(client),
		changeList: changeList(client),
		changeRole: changeRole(client),
		deleteBoard: deleteBoard(client),
		deleteList: deleteList(client),
		deleteUser: deleteUser(client),
	}, card: {
		getCards: getCards(client),
		addCard: addCard(client),
		addFile: addFile(client),
		changeCard: changeCard(client),
		renameFile: renameFile(client),
		deleteCard: deleteCard(client),
		deleteFile: deleteFile(client),
	}, user: {
		fetchData: fetchData(client),
		signup: signup(client),
		login: login(client),
		changeBoards: changeBoards(client),
		leave: leave(client),
	}, file: {
		getImage: getImage(client),
		uploadFile: uploadFile(client),
		uploadImage: uploadImage(client),
		downloadFile: downloadFile(client),
		downloadImage: downloadImage(client),
	},
};