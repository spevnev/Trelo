import React from "react";
import {useNavigate} from "react-router";
import styled from "styled-components";

export const Centre = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const Link = styled.p`
  font-size: 2rem;
  cursor: pointer;
  color: #5555dd;
  transition: all .3s;
  margin: 5px 0;

  &:hover {
    color: #3333ff;
  }
`;

const PageError = ({children}) => {
	const navigate = useNavigate();


	return (
		<Centre>
			<h1>{children}</h1>
			<Link onClick={() => navigate("/")}>Go back</Link>
		</Centre>
	);
};

export default PageError;