import React from "react";
import {useNavigate} from "react-router";
import styled from "styled-components";
import logo from "../assets/imgs/logo.png";
import {useSelector} from "react-redux";
import {getUser} from "../redux/selectors";

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
  margin: 0 1.5rem;
`;

const Title = styled.p`
  font-size: 2.4rem;
`;

const Username = styled.p`
  font-size: 18px;
  text-transform: capitalize;
`;

const UserIcon = styled.div`
  display: block;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background: url("${props => props.image}");
  background-position: center;
  background-size: cover;
  margin: 0 1rem;
`;

const Header = () => {
	const navigate = useNavigate();
	const user = useSelector(getUser());


	const logout = () => {
		localStorage.removeItem("JWT");
		window.location.reload();
	};


	if (!user) return null;


	return (
		<HeaderContainer>
			<Container style={{cursor: "pointer"}} onClick={() => navigate("/")}>
				<img src={logo} width="32px" height="32px" alt=""/>
				<Title>Trelo</Title>
			</Container>

			<Container>
				<Username>{user.username}</Username>
				{user.icon && <UserIcon onClick={logout} image={`http://localhost:3000/static/icons/${user.icon}.png`}/>}
			</Container>
		</HeaderContainer>
	);
};

export default Header;