import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router";
import {ReactComponent as StarEmpty} from "../../assets/svg/star-empty.svg";
import {ReactComponent as StarFull} from "../../assets/svg/star-full.svg";
import {ReactComponent as Cog} from "../../assets/svg/cog.svg";
import {ReactComponent as Exit} from "../../assets/svg/exit.svg";
import {useDispatch, useSelector} from "react-redux";
import {Leave, ToggleFavourite} from "../../redux/thunkActionCreators/userActionCreator";
import {getUser} from "../../redux/selectors";

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 2vw;
  color: #fff;
`;

const NavEl = styled.div`
  background: #5499cf;
  padding: 3px 6px;
  border-radius: 3px;
  margin-right: 20px;

  & svg {
    cursor: pointer;
    width: 18px;
    height: 18px;
    fill: #fff;
  }
`;

const Title = styled.p`
  font-size: 16px;
`;


const NavBar = ({board}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const boards = useSelector(getUser()).boards || [];


	const leaveBoard = () => {
		dispatch(Leave(board.id));
		navigate("/");
	};


	let userBoard = boards.filter(cur => cur.id === board.id);
	if (userBoard.length !== 1) return null;
	userBoard = userBoard[0];


	return (
		<NavBarContainer>
			<NavEl><Title>{board.title}</Title></NavEl>
			<NavEl onClick={() => dispatch(ToggleFavourite(board.id))}>{userBoard.isFavourite ? <StarFull/> : <StarEmpty/>}</NavEl>
			{userBoard.isOwner ?
				<NavEl><Cog onClick={() => navigate("settings")}/></NavEl>
				:
				<NavEl><Exit style={{marginLeft: 2, width: "18px"}} onClick={leaveBoard}/></NavEl>
			}
		</NavBarContainer>
	);
};

export default NavBar;