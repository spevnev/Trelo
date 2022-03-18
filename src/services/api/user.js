import request from "../request";
import axios from "../axiosClient";

export const fetchData = async () => {
	const res = await request(axios.get("/user/"));

	if (!res) localStorage.removeItem("JWT");

	return res;
};

export const login = (username, password) => request(axios.post("/auth/login", {username: username.toLowerCase(), password}));
export const signup = (username, password, icon) => request(axios.post("/auth/signup", {username: username.toLowerCase(), password, icon}));
export const uploadIcon = icon => request(axios.post(`/auth/icon/`, {icon}));

export const leave = (boardId) => request(axios.post("/user/leave", {boardId}));

export const changeBoards = newBoards => request(axios.put(`/user/`, {boards: newBoards}));
export const toggleFavourite = (boardId, isFavourite) => request(axios.put(`/user/favourite`, {boardId, isFavourite}));