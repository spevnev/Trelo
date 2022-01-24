import React from "react";
import {useNavigate} from "react-router";
import styled from "styled-components";
import logo from "../assets/logo.png";

const HeaderContainer = styled.div`
  width: 100vw;
  height: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #b0b0b0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 10px;
`;

const Title = styled.p`
  font-size: 24px;
`;

const Username = styled.p`
  font-size: 18px;
`;

const UserIcon = styled.div`
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: url("${props => props.image}");
  background-position: center;
  background-size: cover;
  margin: 0 10px;
`;

const Header = () => {
	const navigate = useNavigate();

	return (
		<HeaderContainer>
			<Container style={{cursor: "pointer"}} onClick={() => navigate("/")}>
				<img src={logo} width="32px" height="32px" alt=""/>
				<Title>Trelo</Title>
			</Container>

			<Container>
				<Username>Username</Username>
				<UserIcon image="https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png"/>
			</Container>
		</HeaderContainer>
	);
};

export default Header;