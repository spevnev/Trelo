import React from "react";
import styled from "styled-components";

import logo from "../../assets/logo.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 60vw;
  height: 60vh;
  margin: auto 0;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.3);
`;

const TitleContainer = styled.div`
  margin-top: 3vh;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3.2rem;
`;

const Login = () => {
	return (
		<Container>
			<TitleContainer>
				<img src={logo} width="64px" height="64px" alt=""/>
				<Title>Trelo</Title>
			</TitleContainer>

			<Wrapper>
				<LoginForm/>
				<SignupForm/>
			</Wrapper>
		</Container>
	);
};

export default Login;