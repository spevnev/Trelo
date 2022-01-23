import React from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {v4 as uuid} from "uuid";

import {addCard} from "../../redux/actionCreators/boardActionCreator";

import Card from "./Card";
import {useNavigate} from "react-router";

const Title = styled.p`
  font-size: 2rem;
  margin-bottom: 5px;
`;

const ListContainer = styled.div`
  width: 25rem;
  background: #aaa;
  margin-right: 3rem;
  padding: 8px 12px;
  border-radius: 5px;
  height: 100%;
`;

const AddCard = styled.p`
  cursor: pointer;
  font-size: 1.4rem;
`;

const List = ({title, cards, boardId, id}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const newCard = () => {
		const cardId = uuid();

		dispatch(addCard(boardId, id, cardId));
		navigate(cardId);
	};

	return (
		<ListContainer>
			<Title>{title}</Title>

			{cards && cards.map(card => <Card key={card.id} {...card}/>)}

			<AddCard onClick={newCard}>+ Add card</AddCard>
		</ListContainer>
	);
};

export default List;