import {getCard, getCards} from "../../redux/selectors";
import {addCard, changeCard, deleteCard, reorderCards} from "../../redux/actionCreators/cardActionCreator";

const registerCardHandler = (socket, store) => {
	const {getState, dispatch} = store;

	socket.on("card:add", ({boardId, card}) => dispatch(addCard(boardId, card)));
	socket.on("card:delete", ({boardId, id}) => dispatch(deleteCard(boardId, id)));

	socket.on("card:change", ({boardId, card}) => dispatch(changeCard(boardId, card)));
	socket.on("card:reorder", ({boardId, order}) => dispatch(reorderCards(boardId, order)));

	socket.on("card:addFile", ({boardId, cardId, files}) => {
		const card = getCard(boardId, cardId)(getState());

		dispatch(changeCard(boardId, {...card, files: [...card.files, ...files]}));
	});
	socket.on("card:deleteFile", ({boardId, url}) => {
		const cards = getCards(boardId)(getState());
		let card = cards.filter(card => card.files.map(file => file.url).indexOf(url) !== -1);
		if (card.length !== 1) return;
		card = card[0];

		const files = card.files.filter(file => file.url !== url);

		dispatch(changeCard(boardId, {...card, files}));
	});
	socket.on("card:changeFile", ({boardId, file}) => {
		const cards = getCards(boardId)(getState());
		let card = cards.filter(card => card.files.map(file => file.url).indexOf(file.url) !== -1);
		if (card.length !== 1) return;
		card = card[0];

		const files = card.files.map(cur => cur.url === file.url ? file : cur);

		dispatch(changeCard(boardId, {...card, files}));
	});
};

export default registerCardHandler;
