import {io} from "socket.io-client";
import config from "../../config";
import store from "../../redux/store";
import registerCardHandler from "./cardHandler";
import registerBoardHandler from "./boardHandler";

const socket = io(`${config.BACKEND}`, {path: "/ws/", transports: ["websocket"], upgrade: false});

registerCardHandler(socket, store);
registerBoardHandler(socket, store);

export default socket;