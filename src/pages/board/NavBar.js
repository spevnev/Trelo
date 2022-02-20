import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router";
import {ReactComponent as StarEmpty} from "../../assets/svg/star-empty.svg";
import {ReactComponent as StarFull} from "../../assets/svg/star-full.svg";
import {ReactComponent as Cog} from "../../assets/svg/cog.svg";
import {ReactComponent as Exit} from "../../assets/svg/exit.svg";
import {useDispatch, useSelector} from "react-redux";
import {leave, toggleFavourite} from "../../redux/actionCreators/userActionCreator";
import {getUser} from "../../redux/selectors";

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem;
  color: #fff;
`;

const NavEl = styled.div`
  background: #5499cf;
  padding: 3px 6px;
  border-radius: 3px;
  margin: 0 10px;

  & svg {
    cursor: pointer;
    width: 1.8rem;
    height: 1.8rem;
    fill: #fff;
  }
`;

const Title = styled.p`
  font-size: 1.6rem;
`;


const NavBar = ({board}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const boards = useSelector(getUser()).boards;


	const leaveBoard = () => {
		dispatch(leave(board.id));
		navigate("/");
	};


	const userBoard = boards.filter(cur => cur.id === board.id);
	if (userBoard.length !== 1)
		return null;


	return (
		<NavBarContainer>
			<NavEl><Title>{board.title}</Title></NavEl>
			<NavEl onClick={() => dispatch(toggleFavourite(board.id))}>{userBoard[0].isFavourite ? <StarFull/> : <StarEmpty/>}</NavEl>
			{userBoard[0].isOwner ?
				<NavEl><Cog onClick={() => navigate("settings")}/></NavEl>
				:
				<NavEl><Exit style={{marginLeft: 2, width: "1.8rem"}} onClick={leaveBoard}/></NavEl>
			}
		</NavBarContainer>
	);
};

export default NavBar;