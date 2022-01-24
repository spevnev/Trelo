import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Button from "./Button";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  width: 40rem;
  min-height: 10rem;
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
    font-size: 2rem;
    width: 90%;
    text-align: center;
    margin: 1rem 0;
  }

  & ${Button} {
    margin: 1rem 20px;
  }
`;

const Modal = ({onContinue, onCancel, children, prompt, isOpenProp}) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => setIsOpen(isOpenProp), [isOpenProp]);

	const cancel = () => {
		setIsOpen(false);
		onCancel();
	};

	return (
		<>
			{isOpen &&
				<Overlay>
					<ModalContainer>
						<p>{prompt}</p>
						<div>
							<Button onClick={onContinue}>Continue</Button>
							<Button onClick={cancel}>Cancel</Button>
						</div>
					</ModalContainer>
				</Overlay>
			}
			<div onClick={() => setIsOpen(true)}>{children}</div>
		</>
	);
};

export default Modal;