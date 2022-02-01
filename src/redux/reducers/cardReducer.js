import types from "../actions/cardActions";

const emptyCard = (id, listId) => ({title: "", id, listId, description: "", images: [], files: [], assigned: []});

const cardReducer = (state = [], action) => {
	const payload = action.payload;

	const changeBoard = func => state.map(cur => cur.id === payload.boardId ? func(cur) : cur);
	const changeCard = func => changeBoard(cur => ({...cur, cards: cur.cards.map(cur => cur.id === payload.id ? func(cur) : cur)}));

	switch (action.type) {
		case types.addCardBoard:
			return [...state, {id: payload.boardId, cards: payload.cards}];

		case types.addCard:
			return changeBoard(cur => ({...cur, cards: [...cur.cards, emptyCard(payload.id, payload.listId)]}));
		case types.deleteCard:
			return changeBoard(cur => ({...cur, cards: cur.cards.filter(cur => cur.id !== payload.id)}));
		case types.reorderCard:
			return changeCard(cur => ({...cur, listId: payload.listId}));

		case types.deleteCardsInList:
			return changeBoard(cur => ({...cur, cards: cur.cards.filter(cur => cur.listId !== payload.listId)}));
		case types.deleteCardsInBoard:
			return state.filter(cur => cur.id !== payload.boardId);
		case types.deleteAssignedInCards:
			return changeBoard(cur => ({...cur, cards: cur.cards.map(cur => ({...cur, assigned: cur.assigned.filter(cur => cur.username !== payload.username)}))}));

		case types.changeTitle:
			return changeCard(cur => ({...cur, title: payload.title}));

		case types.changeDescription:
			return changeCard(cur => ({...cur, description: payload.description}));

		case types.addImage:
			return changeCard(cur => ({...cur, images: [...cur.images, payload.src]}));
		case types.deleteImage:
			return changeCard(cur => ({...cur, images: cur.images.filter(cur => cur !== payload.src)}));

		case types.addFile:
			return changeCard(cur => ({...cur, files: [...cur.files, payload.file]}));
		case types.deleteFile:
			return changeCard(cur => ({...cur, files: cur.files.filter(cur => cur.filename !== payload.filename)}));
		case types.renameFile:
			return changeCard(cur => ({...cur, files: cur.files.map(cur => cur.filename === payload.filename ? {...cur, filename: payload.newFilename} : cur)}));

		case types.addAssigned:
			return changeCard(cur => ({...cur, assigned: [...cur.assigned, payload.user]}));
		case types.deleteAssigned:
			return changeCard(cur => ({...cur, assigned: cur.assigned.filter(cur => cur.username !== payload.username)}));

		default:
			return state;
	}
};

export default cardReducer;