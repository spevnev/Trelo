import axios from "axios";
import {getBoard} from "./board";
import {getCards} from "./cards";

const client = axios.create();

export default () => ({
	board: {
		getBoard: getBoard(client),
	},
	card: {
		getCards: getCards(client),
	},
});