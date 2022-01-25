import types from "../actions/cardActions";

const defaultState = [{
	id: "1",
	cards: [
		{
			title: "Card 1-1",
			id: "1",
			listId: "1",
			description: "Description",
			images: ["https://www.uedvision.com.ua/wp-content/uploads/2020/02/placeholder.png", "https://farm3.staticflickr.com/2821/33503322524_4e67143f45_k.jpg?momo_cache_bg_uuid=ac7fdf60-5867-4a87-bf83-2ded30d61c59"],
			files: [{filename: "sth.exe", id: "1"}],
			assigned: [{username: "Somebody", icon: "https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png"}],
		},
		{
			title: "Card 1-2", id: "2", listId: "1", description: "Description", images: [], files: [
				{filename: "something.txt", id: "1"}, {filename: "file.exe", id: "2"},
			], assigned: [],
		},
		{
			title: "Card 2-1",
			id: "3",
			listId: "2",
			description: "Description",
			images: ["https://www.uedvision.com.ua/wp-content/uploads/2020/02/placeholder.png"],
			files: [],
			assigned: [],
		},
		{title: "Card 2-2", id: "4", listId: "2", description: "Description", images: [], files: [], assigned: []},
	],
}];

const cardReducer = (state = defaultState, action) => {
	const payload = action.payload;

	switch (action.type) {
		case types.addCardBoard:
			return [...state, {id: payload.boardId, cards: []}];
		case types.addCard:
			return state.map(cur => cur.id === payload.boardId ? {
				...cur,
				cards: [...cur.cards, {title: "", id: payload.id, listId: payload.listId, description: "", images: [], files: [], assigned: []}],
			} : cur);
		case types.changeCard:
			return state.map(cur => cur.id === payload.boardId ? {...cur, cards: cur.cards.map(cur => cur.id === payload.id ? {...cur, ...payload.changes} : cur)} : cur);
		case types.deleteCard:
			return state.map(cur => cur.id === payload.boardId ? {...cur, cards: cur.cards.filter(cur => cur.id !== payload.id)} : cur);
		case types.deleteCardsInList:
			return state.map(cur => cur.id === payload.boardId ? {...cur, cards: cur.cards.filter(cur => cur.listId !== payload.listId)} : cur);
		case types.deleteCardsInBoard:
			return state.filter(cur => cur.id !== payload.boardId);
		case types.deleteAssignedInCards:
			return state.map(cur => cur.id === payload.boardId ? {
				...cur,
				cards: cur.cards.map(cur => ({...cur, assigned: cur.assigned.filter(cur => cur.username !== payload.username)})),
			} : cur);
		default:
			return state;
	}
};

export default cardReducer;