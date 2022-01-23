import React from "react";
import styled from "styled-components";

import textIcon from "../../assets/svg/paragraph-left.svg";
import imageIcon from "../../assets/svg/images.svg";
import {useNavigate} from "react-router";

const CardContainer = styled.div`
  margin-bottom: 10px;
  background: #fbfbfb;
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 1.6rem;
  cursor: pointer;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 3px;
`;

const Icon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 5px;
`;

const UserIcon = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-left: 2px;
`;

const Card = ({title, id}) => {
	const navigate = useNavigate();
	const openCard = () => navigate(`${id}`);

	return (
		<CardContainer onClick={openCard}>
			<p>{title}</p>

			<SubContainer>
				<div>
					<Icon src={textIcon}/>
					<Icon src={imageIcon}/>
				</div>

				<div>
					<UserIcon src="https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png"/>
					<UserIcon src="https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png"/>
				</div>
			</SubContainer>
		</CardContainer>
	);
};

export default Card;