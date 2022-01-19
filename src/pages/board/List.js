import React from "react";
import styled from "styled-components";

import Card from "./Card";

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

const List = ({title, cards}) => {
	const addCard = () => {
	};

	return (
		<ListContainer>
			<Title>{title}</Title>
			{cards.map(card => <Card key={card.id} {...card}/>)}
			<AddCard onClick={addCard}>+ Add card</AddCard>
		</ListContainer>
	);
};

export default List;