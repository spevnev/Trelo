import styled from "styled-components";
import {useNavigate} from "react-router";

import {BoardContainer} from "./styles";

const CenteredText = styled.p`
  font-size: 2.4rem;
  margin: auto;
`;

const NewBoard = () => {
	const navigate = useNavigate();

	const openSettings = () => {

		
		navigate("/board/new/settings");
	}

	return (
		<BoardContainer onClick={openSettings}>
			<CenteredText>New board</CenteredText>
		</BoardContainer>
	);
};

export default NewBoard;