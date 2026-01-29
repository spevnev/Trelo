import {jwtDecode} from "jwt-decode";

export const getToken = () => {
	const token = localStorage.getItem("JWT");
	if (!token) return null;

	const data = jwtDecode(token);
	if (data.exp < Math.round(Date.now() / 1000)) return null;

	return "Bearer " + token;
};