import actions from "../../redux/actions/cardActions";
import {getCard, getCards} from "../../redux/selectors";

const registerCardHandler = (socket, store) => {
	const {getState, dispatch} = store;

	socket.on("card:add", payload => dispatch({type: actions.addCard, payload}));
	socket.on("card:delete", payload => dispatch({type: actions.deleteCard, payload}));

	socket.on("card:change", ({boardId, card}) => dispatch({type: actions.changeCard, payload: {boardId, id: card.id, newCard: card}}));
	socket.on("card:reorder", payload => dispatch({type: actions.reorderCards, payload}));

	socket.on("card:addFile", ({boardId, cardId, files}) => {
		const card = getCard(boardId, cardId)(getState());

		dispatch({type: actions.changeCard, payload: {boardId, id: cardId, newCard: {...card, files: [...card.files, ...files]}}});
	});
	socket.on("card:deleteFile", ({boardId, url}) => {
		const cards = getCards(boardId)(getState());
		let card = cards.filter(card => card.files.map(file => file.url).indexOf(url) !== -1);
		if (card.length !== 1) return;
		card = card[0];

		const files = card.files.filter(file => file.url !== url);

		dispatch({type: actions.changeCard, payload: {boardId, id: card.id, newCard: {...card, files}}});
	});
	socket.on("card:changeFile", ({boardId, file}) => {
		const cards = getCards(boardId)(getState());
		let card = cards.filter(card => card.files.map(file => file.url).indexOf(file.url) !== -1);
		if (card.length !== 1) return;
		card = card[0];

		const files = card.files.map(cur => cur.url === file.url ? file : cur);

		dispatch({type: actions.changeCard, payload: {boardId, id: card.id, newCard: {...card, files}}});
	});
};

export default registerCardHandler;
