import React, {useEffect, useRef, useState} from "react";
import {Form, StyledButton, SubContainer, SubText, Text} from "./styles";
import Input from "../../components/StyledInput";
import ErrorMessage from "../../components/ErrorMessage";
import {useDispatch} from "react-redux";
import {Login} from "../../redux/thunkActionCreators/userActionCreator";
import useKeyboard from "../../hooks/useKeyboard";
import {useNavigate} from "react-router";
import schema, {validatePassword, validateUsername} from "../../schema";
import config from "../../config";

let timeout = null;
const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [errorMsg, setErrorMsg] = useState();
	const [formState, setFormState] = useState({username: "", password: ""});
	const formRef = useRef();

	useKeyboard({ref: formRef, key: "enter", cb: () => submit()});

	useEffect(() => () => clearTimeout(timeout), []);


	const displayError = text => {
		setErrorMsg(text);
		timeout = setTimeout(() => setErrorMsg(null), config.ERROR_DURATION_MS);
	};

	const submit = () => {
		if (!validateUsername(formState.username, displayError)) return;
		if (!validatePassword(formState.password, displayError)) return;

		dispatch(Login(formState.username.toLowerCase(), formState.password, displayError));
	};


	return (
		<SubContainer $background="#fff" $color="#000">
			<Text>Log in</Text>
			<SubText>Already signed up?</SubText>

			<Form ref={formRef}>
				<Input placeholder="Username" maxLength={schema.username.max} value={formState.username}
					   onChange={e => setFormState({...formState, username: e.target.value})}/>
				<Input type="password" placeholder="Password" maxLength={schema.password.max} value={formState.password}
					   onChange={e => setFormState({...formState, password: e.target.value})}/>

				<ErrorMessage $fixedHeight>{errorMsg}</ErrorMessage>
				<StyledButton onClick={submit}>Log in</StyledButton>
			</Form>
		</SubContainer>
	);
};

export default LoginForm;