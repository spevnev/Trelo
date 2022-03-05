import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import Button from "./Button";
import useKeyboard from "../hooks/useKeyboard";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const ModalContainer = styled.div`
  width: 400px;
  min-height: 100px;
  background: #dfdfdf;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 999;

  & p {
    font-size: 20px;
    width: 90%;
    text-align: center;
    margin: 10px 0;
  }

  & ${Button} {
    margin: 10px 20px;
  }
`;

const Modal = ({onContinue, onCancel, children, prompt, isOpenedProp}) => {
	const [isOpened, setIsOpened] = useState(false);
	const ref = useRef();

	useKeyboard({ref, key: "enter", priority: 1, cb: () => onContinue()}, {ref, key: "escape", priority: 1, cb: () => cancel()});

	useEffect(() => setIsOpened(isOpenedProp), [isOpenedProp]);


	const cancel = () => {
		setIsOpened(false);
		if (onCancel) onCancel();
	};


	return (
		<>
			{isOpened &&
				<Overlay ref={ref}>
					<ModalContainer>
						<p>{prompt}</p>
						<div>
							<Button onClick={onContinue}>Continue</Button>
							<Button onClick={cancel}>Cancel</Button>
						</div>
					</ModalContainer>
				</Overlay>
			}
			<div onClick={() => setIsOpened(true)}>{children}</div>
		</>
	);
};

export default Modal;