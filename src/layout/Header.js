import React from "react";
import {useNavigate} from "react-router";
import styled from "styled-components";
import logo from "../assets/imgs/white_logo.png";
import {useSelector} from "react-redux";
import {getUser} from "../redux/selectors";

const HeaderContainer = styled.div`
  width: 100vw;
  height: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #0765a0;
  color: #f0f0f0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 2rem;
`;

const Logo = styled.img`
  height: 2.5vh;
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


	if (!user) return null;

	return (
		<HeaderContainer>
			<Container style={{cursor: "pointer"}} onClick={() => navigate("/")}>
				<Logo src={logo}/>
			</Container>

			<Container>
				<Username>{user.username}</Username>
				{user.icon && <UserIcon image={`http://localhost:3000/static/icons/${user.icon}.png`}/>}
			</Container>
		</HeaderContainer>
	);
};

export default Header;