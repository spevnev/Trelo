import {addUser, changeBoard, changeList, changeUser, createBoard, createList, deleteBoard, deleteList, deleteUser, getBoard} from "./board";
import {addCard, addFiles, changeCard, deleteCard, deleteFile, getCards, renameFile, reorderCards} from "./card";
import {changeBoards, fetchData, leave, login, signup, toggleFavourite, uploadIcon} from "./user";
import {downloadFile, uploadFiles} from "./file";
import {getToken} from "./jwt";
import config from "../config";
import axios from "axios";

const client = axios.create({baseURL: `${config.BACKEND}/api/`});

client.interceptors.request.use(req => {
	const token = getToken();
	if (token) req.headers.authorization = token;
	return req;
});


const bundle = {
	boardAPI: {
		getBoard: getBoard(client),
		createBoard: createBoard(client),
		createList: createList(client),
		addUser: addUser(client),
		changeTitle: changeBoard(client),
		changeList: changeList(client),
		changeRole: changeUser(client),
		deleteBoard: deleteBoard(client),
		deleteList: deleteList(client),
		deleteUser: deleteUser(client),
	}, cardAPI: {
		getCards: getCards(client),
		addCard: addCard(client),
		addFiles: addFiles(client),
		changeCard: changeCard(client),
		reorderCards: reorderCards(client),
		renameFile: renameFile(client),
		deleteCard: deleteCard(client),
		deleteFile: deleteFile(client),
	}, userAPI: {
		fetchData: fetchData(client),
		signup: signup(client),
		uploadIcon: uploadIcon(client),
		login: login(client),
		changeBoards: changeBoards(client),
		leave: leave(client),
		toggleFavourite: toggleFavourite(client),
	}, fileAPI: {
		uploadFiles: uploadFiles(client),
		downloadFile: downloadFile(client),
	},
};

export default bundle;