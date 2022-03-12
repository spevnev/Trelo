import React, {useContext, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import cross from "../../assets/svg/cross.svg";
import download from "../../assets/svg/download.svg";
import {Container, SubTitle} from "./styles";
import HiddenInput from "../../components/HiddenInput";
import {useDispatch} from "react-redux";
import {AddFiles, DeleteFile} from "../../redux/thunkActionCreators/cardActionCreator";
import bundle from "../../services/api";
import PopUp from "../../components/PopUp";
import {CardContext} from "./index";
import schema from "../../schema";

const ErrorMessage = styled.p`
  font-size: 12px;
  color: #ff5e5e;
  margin: 1px 2px;
`;

const FileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 400px;
  width: 95vw;

  & ${HiddenInput} {
    font-size: 20px;
    margin-right: 20px;
  }
`;

const Icon = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const BlockContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddFile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 250px;
  height: 30px;
  background: #eee;
  border-radius: 5px;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    filter: brightness(90%);
  }
`;

const DropOverlay = styled(AddFile)`
  font-size: 18px;
  border: 2px dashed #000;
`;


const File = ({filename, url}) => {
	const dispatch = useDispatch();
	const {board, state, setState} = useContext(CardContext);
	const [msg, setMsg] = useState(null);


	const rename = e => {
		if (!e.target.value) setMsg("File name can't be empty!");
		else setMsg(null);

		setState({...state, files: state.files.map(file => file.url === url ? {...file, filename: e.target.value} : file)});
	};


	return (
		<>
			<FileContainer>
				<HiddenInput placeholder="File name" onChange={rename} value={filename}/>

				<Icon src={download} onClick={() => bundle.fileAPI.downloadFile(url, filename)}/>
				<Icon src={cross} onClick={() => dispatch(DeleteFile(board.id, state.id, url))}/>
			</FileContainer>

			<ErrorMessage>{msg}</ErrorMessage>
		</>
	);
};

let stateVar = null;
const FileInput = ({setUploading}) => {
	const dispatch = useDispatch();
	const input = useRef(null);
	const {board, state, setState, isOverlayVisible} = useContext(CardContext);

	useEffect(() => stateVar = state, [state]);


	const preventDefault = e => e.preventDefault();

	const onDrop = e => {
		input.current.files = e.dataTransfer.files;
		onFile({target: input.current});
		e.preventDefault();
	};

	const onFile = e => {
		const files = [...e.target.files].slice(0, 10 - state.files.length);

		const arr = [];
		for (let i = 0; i < files.length; i++) {
			const reader = new FileReader();
			reader.readAsDataURL(files[i]);

			setUploading(true);

			reader.onload = () => {
				arr.push({filename: files[i].name, data: reader.result});
				if (arr.length === files.length) {
					dispatch(AddFiles(board.id, state.id, arr, files => {
						setUploading(false);
						setState({...stateVar, files: [...stateVar.files, ...files]});
					}));
				}
			};
		}
	};


	return (
		<>
			<input maxLength={schema.fileTitle.max} ref={input} style={{display: "none"}}
				   id="uploadFile" type="file" accept="*/*" onChange={onFile} multiple/>
			<label htmlFor="uploadFile" onDragOver={preventDefault} onDragEnter={preventDefault} onDrop={onDrop}>
				{isOverlayVisible ? <DropOverlay>Drop here to add file</DropOverlay> : <AddFile>Add file</AddFile>}
			</label>
		</>
	);
};

const Files = () => {
	const {state, setSaved} = useContext(CardContext);
	const [isShown, setShown] = useState(false);


	const setUploading = bool => {
		setShown(bool);
		setSaved(!bool);
	};


	return (
		<Container>
			<SubTitle>Attached files</SubTitle>

			<BlockContainer>
				{state.files.map(file => <File key={file.url} {...file}/>)}

				{state.files.length < schema.files.maxLength && <FileInput setUploading={setUploading}/>}
			</BlockContainer>

			<PopUp isShown={isShown}>Uploading file... It might take a few seconds.</PopUp>
		</Container>
	);
};

export default Files;