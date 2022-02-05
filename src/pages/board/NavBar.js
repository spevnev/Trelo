import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router";
import starEmpty from "../../assets/svg/star-empty.svg";
import starFull from "../../assets/svg/star-full.svg";
import cog from "../../assets/svg/cog.svg";
import exit from "../../assets/svg/exit.svg";
import {useDispatch, useSelector} from "react-redux";
import {changeBoards} from "../../redux/actionCreators/userActionCreator";
import {getUser} from "../../redux/selectors";

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

const NavEl = styled.div`
  background: #ddd;
  padding: 2px 4px;
  border-radius: 3px;
  margin: 0 10px;
`;

const Title = styled.p`
  font-size: 1.8rem;
`;

const Icon = styled.img`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
`;


const NavBar = ({board}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const boards = useSelector(getUser()).boards;
	const userBoard = boards.filter(cur => cur.id === board.id)[0];


	const toggleFavourite = () => dispatch(changeBoards(boards.map(cur => cur.id === board.id ? {...cur, isFavourite: !cur.isFavourite} : cur)));

	const leave = () => {
	};


	return (
		<NavBarContainer>
			<NavEl><Title>{board.title}</Title></NavEl>
			<NavEl><Icon src={userBoard.isFavourite ? starFull : starEmpty} onClick={toggleFavourite}/></NavEl>
			{userBoard.isOwner ?
				<NavEl><Icon src={cog} onClick={() => navigate("settings")}/></NavEl>
				:
				<NavEl><Icon src={exit} onClick={() => leave()}/></NavEl>
			}
		</NavBarContainer>
	);
};

export default NavBar;