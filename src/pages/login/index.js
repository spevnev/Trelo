import React, {useState} from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ErrorMessage from "../../components/ErrorMessage";

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
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.3);
`;

const SmallWrapper = styled(Wrapper)`
  min-width: 250px;
  width: 60vw;
  max-width: 400px;
  height: 80vh;
  flex-direction: column;

  & div {
    width: 100%;
  }

  & button {
    margin-bottom: 0;
  }

  & ${ErrorMessage} {
    height: 2.4rem;
  }
`;

const LinkContainer = styled.div`
  background: #${props => props.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;

  & p {
    font-size: 1.2rem;
  }
`;

const Link = styled.p`
  font-size: 1.6rem !important;
  margin-left: 5px;
  text-decoration: underline;
  cursor: pointer;
  color: #3333cc;
`;

const Login = () => {
	const [isLogin, setLogin] = useState(true);

	return (
		<Container>
			<TitleContainer>
				<img src={logo} width="64px" height="64px" alt=""/>
				<Title>Trelo</Title>
			</TitleContainer>

			{window.innerWidth < 800 ?
				isLogin ?
					<SmallWrapper>
						<LoginForm/>
						<LinkContainer bg="f0f0f0">
							<p>Don't have account yet?</p>
							<Link onClick={() => setLogin(false)}>Sign up</Link>
						</LinkContainer>
					</SmallWrapper>
					:
					<SmallWrapper>
						<SignupForm/>
						<LinkContainer bg="c0c0c0">
							<p>Already have an account?</p>
							<Link onClick={() => setLogin(true)}>Log in</Link>
						</LinkContainer>
					</SmallWrapper>
				:
				<Wrapper>
					<LoginForm/>
					<SignupForm/>
				</Wrapper>
			}
		</Container>
	);
};

export default Login;