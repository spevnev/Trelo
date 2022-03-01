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

  width: 60vw;
  padding: 1rem 2rem;

  background: #fff;
  border-radius: 10rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  &.in {
    animation: ${popup} .5s ease-out;
  }

  &.out {
    animation: ${popout} .5s ease-out;
  }
`;

const Text = styled.p`
  font-size: 1.8rem;
  font-weight: 300;
  text-align: center;
`;


const PopUp = ({children, isShown}) => {
	const [isVisible, setVisible] = useState(false);
	const [classes, setClasses] = useState("");


	useEffect(() => {
		if (isShown) {
			setVisible(true);
			setClasses("in");
			setTimeout(() => setClasses(""), 600);
		} else {
			setClasses("out");
			setTimeout(() => {
				setClasses("");
				setVisible(false);
			}, 500);
		}
	}, [isShown]);


	return (<>{isVisible &&
		<Container className={classes}>
			<Text>{children}</Text>
		</Container>
	}</>);
};

export default PopUp;