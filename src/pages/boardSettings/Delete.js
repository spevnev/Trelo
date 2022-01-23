import React, {useState} from "react";
import styled from "styled-components";
import Button from "../../components/Button";

const DeleteText = styled.p`
  color: #f66666;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    color: #ff0000;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  width: 40rem;
  height: 10rem;
  background: #dfdfdf;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 0;
  align-items: center;
  z-index: 999;

  & p {
    font-size: 2rem;
  }

  & ${Button} {
    margin: 0 20px;
  }
`;

const Delete = ({deleteBoard}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{isOpen &&
				<Overlay>
					<Modal>
						<p>Are you sure you want to delete this board?</p>
						<div>
							<Button onClick={deleteBoard}>Delete</Button>
							<Button onClick={() => setIsOpen(false)}>Cancel</Button>
						</div>
					</Modal>
				</Overlay>
			}
			<DeleteText onClick={() => setIsOpen(true)}>Delete board</DeleteText>
		</>
	);
};

export default Delete;