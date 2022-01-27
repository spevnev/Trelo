import React, {useState} from "react";

import {Form, StyledButton, SubContainer, Text} from "./styles";
import Input from "../../components/Input";
import ErrorMessage from "../../components/ErrorMessage";

const LoginForm = () => {
	const [msg, setMsg] = useState();
	const [formState, setFormState] = useState({username: "", password: ""});

	const error = text => {
		setMsg(text);
		setTimeout(() => setMsg(null), 3000);
	};

	const submit = () => {
		if (formState.username.length < 4) return error("Username can't be less than 4 characters!");
		if (formState.password.length < 8) return error("Password can't be less than 8 characters!");
	};

	return (
		<SubContainer colour="f0f0f0">
			<Text>Log in</Text>
			<Text secondary>Already signed up?</Text>

			<Form>
				<Input placeholder="Username" onChange={e => setFormState({...formState, username: e.target.value})} value={formState.username}/>
				<Input placeholder="Password" onChange={e => setFormState({...formState, password: e.target.value})} value={formState.password}/>

				<ErrorMessage>{msg}</ErrorMessage>

				<StyledButton onClick={submit}>Log in</StyledButton>
			</Form>
		</SubContainer>
	);
};

export default LoginForm;