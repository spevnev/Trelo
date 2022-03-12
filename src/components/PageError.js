import React from "react";
import {useNavigate} from "react-router";
import styled from "styled-components";

const Centre = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

const Link = styled.p`
  font-size: 20px;
  cursor: pointer;
  color: #5555dd;
  transition: all .3s;
  margin: 5px 0;

  &:hover {
    color: #3333ff;
  }
`;

const Text = styled.p`
  font-size: 36px;
  font-weight: 300;
`;


const PageError = ({children, goBackUrl = "/"}) => {
	const navigate = useNavigate();


	return (
		<Centre>
			<Text>{children}</Text>
			<Link onClick={() => navigate(goBackUrl)}>Go back</Link>
		</Centre>
	);
};

export default PageError;