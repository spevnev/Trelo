import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import styled from "styled-components";
import starFull from "../../assets/svg/star-full.svg";
import starEmpty from "../../assets/svg/star-empty.svg";
import cog from "../../assets/svg/cog.svg";
import {BoardContainer} from "./styles";
import {getUser} from "../../redux/selectors";
import {changeBoards} from "../../redux/actionCreators/userActionCreator";

const Title = styled.p`
  font-size: 1.8rem;
  word-wrap: anywhere;
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
  margin-left: 5px;
`;


const Board = ({title, isFavourite, isOwner, id}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const boards = useSelector(getUser()).boards;

	const openSettings = e => {
		e.stopPropagation();
		navigate(`/board/${id}/settings`);
	};

	const toggleFavourite = e => {
		e.stopPropagation();
		dispatch(changeBoards(boards.map(cur => cur.id === id ? {...cur, isFavourite: !cur.isFavourite} : cur)));
	};


	return (
		<BoardContainer onClick={() => navigate(`/board/${id}`)} style={{order: isFavourite ? 0 : 1}}>
			<Title>{title}</Title>

			<Icons>
				<Icon onClick={toggleFavourite} src={isFavourite ? starFull : starEmpty}/>
				{isOwner && <Icon onClick={openSettings} src={cog}/>}
			</Icons>
		</BoardContainer>
	);
};

export default Board;