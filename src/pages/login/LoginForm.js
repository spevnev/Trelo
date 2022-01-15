import React, {useState} from "react";

import {Form, StyledButton, SubContainer, Text} from "./styles";
import Input from "../../components/Input";
import ErrorMessage from "../../components/ErrorMessage";

const LoginForm = () => {
	const [error, setError] = useState();

	const [formState, setFormState] = useState({username: "", password: ""});

	const submit = () => {

	};

	return (
		<SubContainer colour="f0f0f0">
			<Text>Log in</Text>
			<Text secondary>Already signed up?</Text>

			<Form onSubmit={submit}>
				<Input placeholder="Username" onChange={e => setFormState({...formState, username: e.target.value})} value={formState.username}/>
				<Input placeholder="Password" onChange={e => setFormState({...formState, password: e.target.value})} value={formState.password}/>

				<ErrorMessage>{error}</ErrorMessage>

				<StyledButton onClick={submit}>Log in</StyledButton>
			</Form>
		</SubContainer>
	);
};

export default LoginForm;