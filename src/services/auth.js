import {getToken} from "./jwt";

export const isAuth = () => getToken() !== null;

export const hasAccess = ({boardId}) => {
	if (boardId === "undefined") return false;

	return true;
};