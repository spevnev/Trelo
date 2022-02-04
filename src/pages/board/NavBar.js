import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router";
import starEmpty from "../../assets/svg/star-empty.svg";
import starFull from "../../assets/svg/star-full.svg";
import cog from "../../assets/svg/cog.svg";

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

const NavEl = styled.div`
  background: #ddd;
  padding: 2px 4px;
  border-radius: 3px;
  margin: 0 10px;
`;

const Title = styled.p`
  font-size: 1.8rem;
`;

const Icon = styled.img`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
`;


const NavBar = ({board}) => {
	const navigate = useNavigate();


	const toggleFavourite = () => {
	};


	return (
		<NavBarContainer>
			<NavEl><Title>{board.title}</Title></NavEl>
			<NavEl><Icon src={board.isFavourite ? starFull : starEmpty} onClick={toggleFavourite}/></NavEl>
			<NavEl><Icon src={cog} onClick={() => navigate("settings")}/></NavEl>
		</NavBarContainer>
	);
};

export default NavBar;