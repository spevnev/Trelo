import React, {useEffect, useRef, useState} from "react";
import {Form, SecondaryText, StyledButton, SubContainer, Text} from "./styles";
import Input from "../../components/StyledInput";
import ErrorMessage from "../../components/ErrorMessage";
import {useDispatch} from "react-redux";
import {login} from "../../redux/actionCreators/userActionCreator";
import useKeyboard from "../../hooks/useKeyboard";
import {useNavigate} from "react-router";
import schema, {validatePassword, validateUsername} from "../../schema";

let timeout = null;
const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [msg, setMsg] = useState();
	const [formState, setFormState] = useState({username: "", password: ""});

	const ref = useRef();
	useKeyboard({ref, key: "enter", cb: () => submit()});

	useEffect(() => () => clearTimeout(timeout), []);


	const error = text => {
		setMsg(text);
		timeout = setTimeout(() => setMsg(null), 3000);
	};

	const submit = () => {
		if (!validateUsername(formState.username, error)) return;
		if (!validatePassword(formState.password, error)) return;

		dispatch(login(formState.username.toLowerCase(), formState.password, error, () => navigate("/")));
	};


	return (
		<SubContainer background="#fff" colour="#000">
			<Text>Log in</Text>
			<SecondaryText>Already signed up?</SecondaryText>

			<Form ref={ref}>
				<Input placeholder="Username" maxLength={schema.username.max} onChange={e => setFormState({...formState, username: e.target.value})} value={formState.username}/>
				<Input type="password" placeholder="Password" maxLength={schema.password.max} onChange={e => setFormState({...formState, password: e.target.value})}
					   value={formState.password}/>

				<ErrorMessage fixedHeight>{msg}</ErrorMessage>

				<StyledButton onClick={submit}>Log in</StyledButton>
			</Form>
		</SubContainer>
	);
};

export default LoginForm;