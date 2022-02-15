import React, {useRef, useState} from "react";
import styled from "styled-components";
import cross from "../../assets/svg/cross.svg";
import download from "../../assets/svg/download.svg";
import {Container, SubTitle} from "./styles";
import HiddenInput from "../../components/HiddenInput";
import {useDispatch} from "react-redux";
import {addFile} from "../../redux/actionCreators/cardActionCreator";
import bundle from "../../services/";

const ErrorMessage = styled.p`
  font-size: 12px;
  color: #ff5e5e;
  margin: 1px 2px;
`;

const FileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & ${HiddenInput} {
    font-size: 2rem;
    margin-right: 20px;
  }
`;

const Icon = styled.img`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
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
  font-size: 2rem;
  width: 20rem;
  height: 3rem;
  background: #eee;
  border-radius: 5px;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    filter: brightness(90%);
  }
`;


const File = ({filename, delFile, renameFile, id, boardId}) => {
	const [msg, setMsg] = useState(null);


	const downloadFile = () => bundle.file.downloadFile(boardId, id, filename);

	const rename = e => {
		if (e.target.value.length === 0) setMsg("File name can't be empty!");
		else setMsg(null);

		renameFile(id, e.target.value);
	};


	return (
		<>
			<FileContainer>
				<HiddenInput placeholder="File name" onChange={rename} value={filename}/>
				<Icon src={download} onClick={downloadFile}/>
				<Icon src={cross} onClick={() => delFile(id)}/>
			</FileContainer>

			<ErrorMessage>{msg}</ErrorMessage>
		</>
	);
};

const FileInput = ({addFile}) => {
	const input = useRef(null);


	const preventDefault = e => e.preventDefault();

	const onDrop = e => {
		input.current.files = e.dataTransfer.files;
		onFile({target: input.current});
		e.preventDefault();
	};

	const onFile = e => {
		const files = e.target.files;

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => addFile(file.name, reader.result);
		}
	};


	return (
		<>
			<input ref={input} style={{display: "none"}} id="uploadFile" type="file" accept="*/*" onChange={onFile}/>
			<label htmlFor="uploadFile"><AddFile onDragOver={preventDefault} onDragEnter={preventDefault} onDrop={onDrop}>Add file</AddFile></label>
		</>
	);
};

const Files = ({state, boardId, commitChanges}) => {
	const dispatch = useDispatch();


	const addFileLocal = (filename, data) => state.files.length < 10 && dispatch(addFile(boardId, state, filename, data));

	const delFile = id => commitChanges({files: state.files.filter(cur => cur.id !== id)});

	const renameFile = (id, newFilename) => commitChanges({files: state.files.map(cur => cur.id === id ? {...cur, filename: newFilename} : cur)});


	return (
		<Container>
			<SubTitle>Attached files</SubTitle>

			<BlockContainer>
				{state.files.map(file => <File key={file.id} {...file} renameFile={renameFile} boardId={boardId} delFile={delFile}/>)}

				{state.files.length < 10 && <FileInput addFile={addFileLocal}/>}
			</BlockContainer>
		</Container>
	);
};

export default Files;