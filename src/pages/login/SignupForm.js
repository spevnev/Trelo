import React, {useEffect, useRef, useState} from "react";
import {Form, StyledButton, SubContainer, SubText, Text} from "./styles";
import Input from "../../components/StyledInput";
import ErrorMessage from "../../components/ErrorMessage";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {Signup} from "../../redux/thunkActionCreators/userActionCreator";
import useKeyboard from "../../hooks/useKeyboard";
import bundle from "../../services/api";
import CropOverlay from "./CropOverlay";
import PopUp from "../../components/PopUp";
import {validatePassword, validateUsername} from "../../schema";
import config from "../../config";

const Button = styled(StyledButton)`
  background: #4040ff;
  color: #fff;
  border: none;
`;

const Icon = styled.label`
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  margin: 25px auto;
  transition: all 0.3s;
  background: ${props => props.src ? `url(${props.src})` : "#fafafa"};
  background-position: center;
  background-size: cover;

  &:hover {
    filter: brightness(90%);
  }
`;


const UserIcon = ({setIcon, displayError}) => {
	const input = useRef(null);
	const [isShown, setIsShown] = useState(false);
	const [isCropping, setIsCropping] = useState(false);
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);


	const preventDefault = e => e.preventDefault();

	const onDrop = e => {
		input.current.files = e.dataTransfer.files;
		onFile({target: input.current});
		e.preventDefault();
	};

	const onFile = e => {
		const file = e.target.files[0];
		e.target.value = null;

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);

			if (file.name.split(".").length === 1) return;
			reader.onload = () => {
				setImage(reader.result);
				setIsCropping(true);
			};
		}
	};

	const onSubmit = async data => {
		setPreview(data);
		setIsShown(true);

		try {
			const res = await bundle.userAPI.uploadIcon(data);

			setIcon(res.url);
			setIsShown(false);
		} catch (e) {
			displayError("Error uploading icon! Check your internet connection.");
			setIsShown(false);
		}
	};


	return (
		<div>
			<Icon htmlFor="userIcon" src={preview} onDragOver={preventDefault} onDragEnter={preventDefault} onDrop={onDrop}/>
			<input ref={input} accept="image/jpeg,image/png" onChange={onFile} id="userIcon" type="file" style={{display: "none"}}/>

			<CropOverlay isShown={isCropping} setIsCropping={setIsCropping} image={image} onSubmit={onSubmit}/>
			<PopUp isShown={isShown}>Uploading icon... It might take a few seconds.</PopUp>
		</div>
	);
};

let timeout = null;
const SignupForm = () => {
	const dispatch = useDispatch();

	const [formState, setFormState] = useState({username: "", password: "", confirm: ""});
	const [icon, setIcon] = useState("");
	const [msg, setMsg] = useState("");
	const formRef = useRef();

	useKeyboard({ref: formRef, key: "enter", cb: () => submit()});

	useEffect(() => () => clearTimeout(timeout), []);


	const changeForm = changes => setFormState({...formState, ...changes});

	const displayError = text => {
		setMsg(text);
		timeout = setTimeout(() => setMsg(null), config.ERROR_DURATION_MS);
	};

	const submit = () => {
		if (!validateUsername(formState.username, displayError)) return;

		if (formState.password !== formState.confirm) return displayError("Passwords don't match!");
		if (!validatePassword(formState.password, displayError)) return;

		if (!icon) return displayError("You must have icon!");

		dispatch(Signup({...formState, icon, username: formState.username.toLowerCase()}, displayError));
	};


	return (
		<SubContainer $background="#0079bf" $color="#fff">
			<Text>Sign up</Text>
			<SubText>Don't have account yet?</SubText>

			<Form ref={formRef}>
				<UserIcon displayError={displayError} setIcon={setIcon}/>

				<Input placeholder="Username" onChange={e => changeForm({username: e.target.value})} value={formState.username}/>
				<Input type="password" placeholder="Password" onChange={e => changeForm({password: e.target.value})} value={formState.password}/>
				<Input type="password" placeholder="Confirm password" onChange={e => changeForm({confirm: e.target.value})} value={formState.confirm}/>

				<ErrorMessage $fixedHeight>{msg}</ErrorMessage>

				<Button onClick={submit}>Sign up</Button>
			</Form>
		</SubContainer>
	);
};

export default SignupForm;