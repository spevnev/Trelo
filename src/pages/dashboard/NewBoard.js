import styled from "styled-components";
import {useNavigate} from "react-router";
import {v4 as uuid} from "uuid";
import {useDispatch} from "react-redux";
import {newBoard} from "../../redux/actionCreators/boardActionCreator";
import {BoardContainer} from "./styles";

const CenteredText = styled.p`
  font-size: 2.4rem;
  margin: auto;
`;


const NewBoard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();


	const openSettings = () => {
		const boardId = uuid();
		dispatch(newBoard(boardId));
		navigate(`/board/${boardId}/settings`);
	};


	return (
		<BoardContainer onClick={openSettings} style={{order: 999}}>
			<CenteredText>New board</CenteredText>
		</BoardContainer>
	);
};

export default NewBoard;