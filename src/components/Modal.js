import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import Button from "./Button";
import useKeyboard from "../hooks/useKeyboard";
import ScreenOverlay from "./ScreenOverlay";
import CentredContainer from "./CentredContainer";

const Overlay = styled(ScreenOverlay)`
  background: rgba(0, 0, 0, 0.6);
`;

const Container = styled(CentredContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  min-height: 100px;
  background: #dfdfdf;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  & ${Button} {
    margin: 10px 20px;
  }
`;

const Text = styled.p`
  font-size: 20px;
  width: 90%;
  text-align: center;
  margin: 10px 0;
`;


const Modal = ({onContinue, onCancel, text, isOpened, children}) => {
	const [isOpenedLocal, setIsOpenedLocal] = useState(false);
	const overlayRef = useRef();

	useKeyboard({ref: overlayRef, key: "enter", priority: 1, cb: () => onContinue()},
		{ref: overlayRef, key: "escape", priority: 1, cb: () => cancel()});

	useEffect(() => setIsOpenedLocal(isOpened), [isOpened]);


	const cancel = () => {
		setIsOpenedLocal(false);
		if (onCancel) onCancel();
	};


	return (
		<>
			{isOpenedLocal &&
				<Overlay ref={overlayRef} onClick={cancel}>
					<Container>
						<Text>{text}</Text>
						<div>
							<Button onClick={onContinue}>Continue</Button>
							<Button onClick={cancel}>Cancel</Button>
						</div>
					</Container>
				</Overlay>
			}
			<div onClick={() => setIsOpenedLocal(true)}>{children}</div>
		</>
	);
};

export default Modal;