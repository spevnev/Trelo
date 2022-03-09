import React, {useEffect, useRef, useState} from "react";
import {Form, SecondaryText, StyledButton, SubContainer, Text} from "./styles";
import Input from "../../components/StyledInput";
import ErrorMessage from "../../components/ErrorMessage";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {signup} from "../../redux/actionCreators/userActionCreator";
import useKeyboard from "../../hooks/useKeyboard";
import bundle from "../../services";
import CropOverlay from "./CropOverlay";
import PopUp from "../../components/PopUp";
import {validatePassword, validateUsername} from "../../schema";

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


const UserIcon = ({setIcon, error}) => {
	const input = useRef(null);
	const [isShown, setShown] = useState(false);
	const [isCropping, setCropping] = useState(false);
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
				setCropping(true);
			};
		}
	};

	const onSubmit = data => {
		setPreview(data);
		setShown(true);

		bundle.userAPI.uploadIcon(data)
			.then(res => {
				setIcon(res.url);
				setShown(false);
			})
			.catch(e => {
				error("Error uploading icon! Check your internet connection.");
				setShown(false);
			});
	};


	return (
		<div>
			<Icon htmlFor="userIcon" src={preview} onDragOver={preventDefault} onDragEnter={preventDefault} onDrop={onDrop}/>
			<input ref={input} accept="image/jpeg,image/png" onChange={onFile} id="userIcon" type="file" style={{display: "none"}}/>

			<CropOverlay isShown={isCropping} setCropping={setCropping} image={image} onSubmit={onSubmit}/>
			<PopUp isShown={isShown}>Uploading icon... It might take a few seconds.</PopUp>
		</div>
	);
};

let timeout = null;
const SignupForm = () => {
	const dispatch = useDispatch();

	const [msg, setMsg] = useState();
	const [formState, setFormState] = useState({username: "", password: "", confirm: ""});
	const [icon, setIcon] = useState("");

	const ref = useRef();
	useKeyboard({ref, key: "enter", cb: () => submit()});

	useEffect(() => () => clearTimeout(timeout), []);


	const changeForm = changes => setFormState({...formState, ...changes});

	const error = text => {
		setMsg(text);
		timeout = setTimeout(() => setMsg(null), 3000);
	};

	const submit = () => {
		if (!validateUsername(formState.username, error)) return;

		if (formState.password !== formState.confirm) return error("Passwords don't match!");
		if (!validatePassword(formState.password, error)) return;

		if (!icon) return error("You must have icon!");

		dispatch(signup({...formState, icon, username: formState.username.toLowerCase()}, error));
	};


	return (
		<SubContainer background="#0079bf" colour="#fff">
			<Text>Sign up</Text>
			<SecondaryText>Don't have account yet?</SecondaryText>

			<Form ref={ref}>
				<UserIcon error={error} setIcon={setIcon}/>

				<Input placeholder="Username" onChange={e => changeForm({username: e.target.value})} value={formState.username}/>
				<Input type="password" placeholder="Password" onChange={e => changeForm({password: e.target.value})} value={formState.password}/>
				<Input type="password" placeholder="Confirm password" onChange={e => changeForm({confirm: e.target.value})} value={formState.confirm}/>

				<ErrorMessage fixedHeight>{msg}</ErrorMessage>

				<Button onClick={submit}>Sign up</Button>
			</Form>
		</SubContainer>
	);
};

export default SignupForm;