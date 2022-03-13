import {addUser, changeBoard, changeList, changeUser, createBoard, createList, deleteBoard, deleteList, deleteUser, getBoard} from "./board";
import {addCard, addFiles, changeCard, deleteCard, deleteFile, getCards, renameFile, reorderCards} from "./card";
import {changeBoards, fetchData, leave, login, signup, toggleFavourite, uploadIcon} from "./user";
import {downloadFile, uploadFiles} from "./file";

const bundle = {
	boardAPI: {getBoard, createBoard, createList, addUser, changeBoard, changeList, changeUser, deleteBoard, deleteList, deleteUser},
	cardAPI: {getCards, addCard, addFiles, changeCard, reorderCards, renameFile, deleteCard, deleteFile},
	userAPI: {fetchData, signup, uploadIcon, login, changeBoards, leave, toggleFavourite},
	fileAPI: {uploadFiles, downloadFile},
};

export default bundle;