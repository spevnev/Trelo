import React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import styled from "styled-components";
import {ReactComponent as StarFull} from "../../assets/svg/star-full.svg";
import {ReactComponent as StarEmpty} from "../../assets/svg/star-empty.svg";
import {ReactComponent as Cog} from "../../assets/svg/cog.svg";
import {BoardContainer} from "./styles";
import {toggleFavourite} from "../../redux/actionCreators/userActionCreator";

const Title = styled.p`
  font-size: 18px;
  word-break: break-all;
  width: 100%;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;


const Board = ({title, isFavourite, isOwner, id}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();


	const openSettings = e => {
		e.stopPropagation();
		navigate(`/board/${id}/settings`);
	};

	const toggleFavouriteLocal = e => {
		e.stopPropagation();
		dispatch(toggleFavourite(id));
	};


	return (
		<BoardContainer onClick={() => navigate(`/board/${id}`)} style={{order: isFavourite ? 0 : 1}}>
			<Title>{title}</Title>

			<Icons>
				{isFavourite ? <StarFull onClick={toggleFavouriteLocal}/> : <StarEmpty onClick={toggleFavouriteLocal}/>}
				{isOwner && <Cog onClick={openSettings}/>}
			</Icons>
		</BoardContainer>
	);
};

export default Board;