import axios from "axios";
import config from "../config";
import {getToken} from "./jwt";

const client = axios.create({baseURL: `${config.BACKEND}/api/`});

client.interceptors.request.use(req => {
	const token = getToken();
	if (token) req.headers.authorization = token;
	return req;
});

export default client;