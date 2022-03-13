import {io} from "socket.io-client";
import config from "../../config";
import store from "../../redux/store";
import registerCardHandler from "./cardHandler";
import registerBoardHandler from "./boardHandler";
import createRoomHandler from "./roomHandler";

// const Deferred = timeout_ms => {
// 	let resolve, reject;
// 	const promise = new Promise((res, rej) => {
// 		resolve = res;
// 		reject = rej;
// 		if (timeout_ms) setTimeout(() => rej(), timeout_ms);
// 	});
//
// 	return [promise, resolve, reject];
// };
//
// let socket;
// export default socket;
//
// const [promise, resolve] = Deferred(config.WS_CONNECTION_TIMEOUT_MS);
// export var roomHandler = promise;
//
// client.get("/auth/wsToken").then(res => {
// 	const options = {
// 		path: "/ws/",
// 		query: {token: res.data},
// 		auth: {JWT: localStorage.getItem("JWT")},
// 		transports: ["websocket"],
// 		upgrade: false,
// 		secure: true,
// 		rejectUnauthorized: false,
// 	};
//
// 	socket = io(`${config.BACKEND}`, options);
//
// 	client.interceptors.request.use(req => {
// 		req.headers.socket_id = socket.id;
// 		return req;
// 	});
//
// 	registerCardHandler(socket, store);
// 	registerBoardHandler(socket, store);
// 	resolve(createRoomHandler(socket));
// });

const options = {
	path: "/ws/",
	auth: {JWT: localStorage.getItem("JWT")},
	transports: ["websocket"],
	upgrade: false,
	secure: true,
	rejectUnauthorized: false,
};
const socket = io(`${config.BACKEND}`, options);

registerCardHandler(socket, store);
registerBoardHandler(socket, store);

export const roomHandler = createRoomHandler(socket);
export default socket;