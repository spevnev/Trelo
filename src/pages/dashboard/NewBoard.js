import styled from "styled-components";
import {useState} from "react";

import Input from "../../components/Input";
import Button from "../../components/Button";
import {BoardContainer} from "./styles";

const CenteredText = styled.p`
  font-size: 2.4rem;
  margin: auto;
`;

const NewBoard = () => {
	const [isButton, setIsButton] = useState(true);

	const cancel = e => {
		e.stopPropagation();
		setIsButton(true);
	}

	const onClick = () => {
		setIsButton(false);
	};

	return (
		<BoardContainer style={{cursor: isButton ? "pointer" : "default"}} onClick={onClick}>
			{isButton ?
				<CenteredText>New board</CenteredText>
				:
				<>
					<Input fontSize="1.4rem" placeholder="Border title"/>
					<div>
						<Button style={{marginRight: 10}} fontSize="1.2rem">Create</Button>
						<Button fontSize="1.2rem" onClick={cancel}>Cancel</Button>
					</div>
				</>}
		</BoardContainer>
	);
};

export default NewBoard;