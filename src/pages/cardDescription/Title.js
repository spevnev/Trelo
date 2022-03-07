import React, {useContext} from "react";
import HiddenInput from "../../components/HiddenInput";
import {Container, Select, SubTitle} from "./styles";
import styled from "styled-components";
import {CardContext} from "./index";
import {getCards} from "../../redux/selectors";
import {useDispatch, useSelector} from "react-redux";
import {changeCard} from "../../redux/actionCreators/cardActionCreator";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;


const Title = () => {
	const dispatch = useDispatch();
	const {board, state, setState} = useContext(CardContext);
	const cards = useSelector(getCards(board.id));
	const curCards = cards.filter(cur => cur.listId === state.listId);


	const reorder = orderStr => {
		const order = Number(orderStr);
		if (isNaN(order)) return;

		curCards.forEach(card => {
			if (state.order > order && card.order < state.order && card.order >= order) dispatch(changeCard(board.id, {...card, order: card.order + 1}));
			else if (card.order > state.order && card.order <= order) dispatch(changeCard(board.id, {...card, order: card.order - 1}));
		});
		dispatch(changeCard(board.id, {...state, order}));
	};

	const move = listId => {
		cards.forEach(card => {
			if (card.listId === state.listId && card.order > state.order) dispatch(changeCard(board.id, {...card, order: card.order - 1}));
			else if (card.listId === listId && card.order >= 0) dispatch(changeCard(board.id, {...card, order: card.order + 1}));
		});
		dispatch(changeCard(board.id, {...state, listId, order: 0}));
	};


	return (
		<Container>
			<SubTitle>Title</SubTitle>
			<HiddenInput maxLength="64" placeholder="Card title" onChange={e => setState({title: e.target.value})} value={state.title}/>
			<Row>
				is #
				<Select onSelect={reorder} initial={{text: state.order + 1, value: state.order}}
						options={new Array(curCards.length).fill(null).map((a, i) => ({text: i + 1, value: i})).filter(cur => cur.value !== state.order)}/>
				in
				<Select onSelect={move} initial={{text: board.lists.filter(cur => cur.id === state.listId)[0].title, value: state.listId}}
						options={board.lists.filter(cur => cur.id !== state.listId).map(cur => ({text: cur.title, value: cur.id}))}/>
				list.
			</Row>
		</Container>
	);
};

export default Title;