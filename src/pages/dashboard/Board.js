import React from "react";
import {useNavigate} from "react-router";
import styled from "styled-components";

import starFull from "../../assets/svg/star-full.svg";
import starEmpty from "../../assets/svg/star-empty.svg";
import cog from "../../assets/svg/cog.svg";

import {BoardContainer} from "./styles";

const Title = styled.p`
  font-size: 1.8rem;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;

const Icon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

const Board = ({title, isFavourite, id}) => {
	const navigate = useNavigate();
	const openSettings = e => {
		e.stopPropagation();
		navigate(`/board/${id}/settings`);
	};
	const openBoard = () => navigate(`/board/${id}`);

	const toggleFavourite = e => {
		e.stopPropagation();

	};

	return (
		<BoardContainer onClick={openBoard}>
			<Title>{title}</Title>

			<Icons>
				<Icon onClick={toggleFavourite} src={isFavourite ? starFull : starEmpty}/>
				<Icon onClick={openSettings} src={cog}/>
			</Icons>
		</BoardContainer>
	);
};

export default Board;