import React, {useEffect, useState} from "react";
import {Form, StyledButton, SubContainer, Text} from "./styles";
import Input from "../../components/Input";
import ErrorMessage from "../../components/ErrorMessage";
import {useDispatch} from "react-redux";
import {login} from "../../redux/actionCreators/userActionCreator";

let timeout = null;
const LoginForm = () => {
	const dispatch = useDispatch();
	const [msg, setMsg] = useState();
	const [formState, setFormState] = useState({username: "", password: ""});

	useEffect(() => () => clearTimeout(timeout), []);


	const error = text => {
		setMsg(text);
		timeout = setTimeout(() => setMsg(null), 3000);
	};

	const submit = () => {
		if (formState.username.length < 4) return error("Username can't be less than 4 characters!");
		if (formState.username.length > 25) return error("Username can't be longer than 25 characters!");
		if (formState.password.length < 4) return error("Password can't be less than 4 characters!");
		if (formState.password.length > 64) return error("Password can't be longer than 64 characters!");

		dispatch(login(formState.username.toLowerCase(), formState.password, error));
	};


	return (
		<SubContainer colour="f0f0f0">
			<Text>Log in</Text>
			<Text secondary>Already signed up?</Text>

			<Form>
				<Input placeholder="Username" maxLength="25" onChange={e => setFormState({...formState, username: e.target.value})} value={formState.username}/>
				<Input placeholder="Password" maxLength="64" onChange={e => setFormState({...formState, password: e.target.value})} value={formState.password}/>

				<ErrorMessage fixedHeight>{msg}</ErrorMessage>

				<StyledButton onClick={submit}>Log in</StyledButton>
			</Form>
		</SubContainer>
	);
};

export default LoginForm;