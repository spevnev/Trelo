import React, {useContext} from "react";
import HiddenInput from "../../components/HiddenInput";
import {Container, Select, SubTitle} from "./styles";
import styled from "styled-components";
import {CardContext} from "./index";
import {getCards} from "../../redux/selectors";
import {useDispatch, useSelector} from "react-redux";
import {ChangeCard} from "../../redux/actionCreators/cardActionCreator";
import schema from "../../schema";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;


const Title = () => {
	const dispatch = useDispatch();

	const {board, state, setState} = useContext(CardContext);
	const cards = useSelector(getCards(board.id));


	const curCards = cards.filter(card => card.listId === state.listId);

	const reorder = orderStr => {
		const order = Number(orderStr);
		if (isNaN(order)) return;

		curCards.forEach(card => {
			if (state.order > order && card.order < state.order && card.order >= order) dispatch(ChangeCard(board.id, {...card, order: card.order + 1}));
			else if (card.order > state.order && card.order <= order) dispatch(ChangeCard(board.id, {...card, order: card.order - 1}));
		});
		dispatch(ChangeCard(board.id, {...state, order}));
	};

	const move = listId => {
		cards.forEach(card => {
			if (card.listId === state.listId && card.order > state.order) dispatch(ChangeCard(board.id, {...card, order: card.order - 1}));
			else if (card.listId === listId && card.order >= 0) dispatch(ChangeCard(board.id, {...card, order: card.order + 1}));
		});
		dispatch(ChangeCard(board.id, {...state, listId, order: 0}));
	};


	const orderOptions = new Array(curCards.length).fill(null).map((a, idx) => ({text: idx + 1, value: idx})).filter(option => option.value !== state.order);
	const listOptions = board.lists.filter(list => list.id !== state.listId).map(list => ({text: list.title, value: list.id}));
	const list = board.lists.filter(list => list.id === state.listId)[0];

	return (
		<Container>
			<SubTitle>Title</SubTitle>

			<HiddenInput maxLength={schema.cardTitle.max} placeholder="Card title" onChange={e => setState({title: e.target.value})} value={state.title}/>
			<Row>
				is #
				<Select onSelect={reorder} initialOption={{text: state.order + 1, value: state.order}} options={orderOptions}/>
				in
				<Select onSelect={move} initialOption={{text: list.title, value: state.listId}} options={listOptions}/>
				list.
			</Row>
		</Container>
	);
};

export default Title;