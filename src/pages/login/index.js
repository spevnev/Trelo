import React from "react";

import {Container, Title, TitleContainer, Wrapper} from "./styles";
import logo from "../../assets/logo.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

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