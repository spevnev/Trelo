export const isAuth = () => {
	return true;
};

export const hasAccess = ({boardId}) => {
	if (boardId === "undefined") return false;

	return true;
};