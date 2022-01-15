import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100vw;
  height: 5vh;
`;

const Header = () => {
	return (
		<HeaderContainer>
			<h3>Header</h3>
		</HeaderContainer>
	);
};

export default Header;