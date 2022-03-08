import request from "./request";

export const fetchData = axios => () => request(axios.get("/user/"));

export const login = axios => (username, password) => request(axios.post("/auth/login", {username: username.toLowerCase(), password}));
export const signup = axios => (username, password, icon) => request(axios.post("/auth/signup", {username: username.toLowerCase(), password, icon}));
export const uploadIcon = axios => icon => request(axios.post(`/auth/icon/`, {icon}));

export const leave = axios => boardId => request(axios.post("/user/leave", {boardId}));

export const changeBoards = axios => newBoards => request(axios.put(`/user/`, {boards: newBoards}));
export const toggleFavourite = axios => (boardId, isFavourite) => request(axios.put(`/user/favourite`, {boardId, isFavourite}));