import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";

const POPUPS_ANIMATION_MS = 500;

const popupAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%);
  }

  100% {
    transform: translate(-50%, -150%);
  }
`;

const popoutAnimation = keyframes`
  0% {
    transform: translate(-50%, -150%);
  }

  100% {
    transform: translate(-50%, -50%);
  }
`;


const Container = styled.div`
  position: fixed;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -150%);

  width: 80vw;
  max-width: 600px;
  padding: 10px 20px;

  background: #fff;
  border-radius: 100px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  &.popupAnimation {
    animation: ${popupAnimation} ${POPUPS_ANIMATION_MS / 1000}s ease-out;
  }

  &.popoutAnimation {
    animation: ${popoutAnimation} ${POPUPS_ANIMATION_MS / 1000}s ease-out;
  }
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 300;
  text-align: center;
  color: #000;
`;


let timeout = null;
const PopUp = ({children, isShown}) => {
	const [isShownLocal, setIsShownLocal] = useState(false);
	const [classes, setClasses] = useState("");


	useEffect(() => () => clearTimeout(timeout), []);

	useEffect(() => {
		if (isShown) {
			setIsShownLocal(true);
			setClasses("popupAnimation");

			timeout = setTimeout(() => {
				setClasses("");
			}, POPUPS_ANIMATION_MS + 50);
		} else {
			setClasses("popoutAnimation");

			timeout = setTimeout(() => {
				setClasses("");
				setIsShownLocal(false);
			}, POPUPS_ANIMATION_MS - 20);
		}
	}, [isShown]);


	if (!isShownLocal) return null;

	return (
		<Container className={classes}>
			<Text>{children}</Text>
		</Container>
	);
};

export default PopUp;