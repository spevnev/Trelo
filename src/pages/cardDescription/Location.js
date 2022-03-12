import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import React, {useContext} from "react";
import {CardContext} from "./index";
import {getCards} from "../../redux/selectors";
import {ChangeCard, ReorderCards} from "../../redux/thunkActionCreators/cardActionCreator";
import {Select} from "./styles";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;


const Location = () => {
	const dispatch = useDispatch();

	const {board, state} = useContext(CardContext);
	const cards = useSelector(getCards(board.id));


	const curCards = cards.filter(card => card.listId === state.listId);

	const reorder = orderStr => {
		const srcOrder = state.order;
		const dstOrder = Number(orderStr);
		if (isNaN(dstOrder)) return;

		const isBetweenSrcAndDst = order => order > srcOrder && order <= dstOrder;
		const isBetweenDstAndSrc = order => order < srcOrder && order >= dstOrder;

		const order = curCards.map(card => {
			if (srcOrder > dstOrder && isBetweenDstAndSrc(card.order)) return {id: card.id, order: card.order + 1};
			if (isBetweenSrcAndDst(card.order)) return {id: card.id, order: card.order - 1};
		}).filter(a => a);

		if (order.length !== 0) dispatch(ReorderCards(board.id, order));
		dispatch(ChangeCard(board.id, {...state, order: dstOrder}));
	};

	const move = dstListId => {
		const srcOrder = state.order;
		const dstOrder = 0;
		const srcListId = state.listId;

		const order = cards.map(card => {
			if (card.listId === srcListId && card.order > srcOrder) return {id: card.id, order: card.order - 1};
			if (card.listId === dstListId && card.order >= dstOrder) return {id: card.id, order: card.order + 1};
		}).filter(a => a);

		if (order.length !== 0) dispatch(ReorderCards(board.id, order));
		dispatch(ChangeCard(board.id, {...state, listId: dstListId, order: 0}));
	};


	const orderOptions = new Array(curCards.length).fill(null).map((a, idx) => ({text: idx + 1, value: idx})).filter(option => option.value !== state.order);
	const listOptions = board.lists.filter(list => list.id !== state.listId).map(list => ({text: list.title, value: list.id}));
	const list = board.lists.filter(list => list.id === state.listId)[0];

	return (
		<Row>
			is #
			<Select onSelect={reorder} initialOption={{text: state.order + 1, value: state.order}} options={orderOptions}/>
			in
			<Select onSelect={move} initialOption={{text: list.title, value: state.listId}} options={listOptions}/>
			list.
		</Row>
	);
};

export default Location;