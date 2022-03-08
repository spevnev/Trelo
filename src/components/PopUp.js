import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";

const popup = keyframes`
  0% {
    transform: translate(-50%, -50%);
  }

  100% {
    transform: translate(-50%, -150%);
  }
`;

const popout = keyframes`
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

  &.in {
    animation: ${popup} .5s ease-out;
  }

  &.out {
    animation: ${popout} .5s ease-out;
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
			setClasses("in");
			timeout = setTimeout(() => setClasses(""), 550);
		} else {
			setClasses("out");
			timeout = setTimeout(() => {
				setClasses("");
				setIsShownLocal(false);
			}, 480);
		}
	}, [isShown]);


	return (<>{isShownLocal &&
		<Container className={classes}>
			<Text>{children}</Text>
		</Container>
	}</>);
};

export default PopUp;