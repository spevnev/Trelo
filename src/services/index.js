import {addUser, changeList, changeRole, changeTitle, createBoard, createList, deleteBoard, deleteList, deleteUser, getBoard} from "./board";
import {addCard, addFiles, changeCard, deleteCard, deleteFile, getCards, renameFile} from "./card";
import {changeBoards, fetchData, leave, login, signup, toggleFavourite} from "./user";
import {downloadFile, downloadImage, getImage, uploadFiles, uploadImages} from "./file";
import {getToken} from "./jwt";
import axios from "axios";

const client = axios.create({baseURL: `https://trelo-back.herokuapp.com/api/`});

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
		addFiles: addFiles(client),
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
		toggleFavourite: toggleFavourite(client),
	}, file: {
		getImage: getImage(client),
		uploadFiles: uploadFiles(client),
		uploadImages: uploadImages(client),
		downloadFile: downloadFile(client),
		downloadImage: downloadImage(client),
	},
};