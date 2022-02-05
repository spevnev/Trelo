import React, {useRef, useState} from "react";
import styled from "styled-components";
import cross from "../../assets/svg/cross.svg";
import download from "../../assets/svg/download.svg";
import {Container, SubTitle} from "./styles";
import HiddenInput from "../../components/HiddenInput";
import ErrorMessage from "../../components/ErrorMessage";
import {v4 as uuid} from "uuid";

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


const File = ({filename, delFile, renameFile, id}) => {
	const [msg, setMsg] = useState(null);


	const downloadFile = e => {
	};

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

const Files = ({files, commitChanges}) => {
	const addFile = (filename, data) => commitChanges({files: [...files, {filename, data, id: uuid()}]});

	const delFile = id => commitChanges({files: files.filter(cur => cur.id !== id)});

	const renameFile = (id, newFilename) => commitChanges({files: files.map(cur => cur.id === id ? {...cur, filename: newFilename} : cur)});


	return (
		<Container>
			<SubTitle>Attached files</SubTitle>

			<BlockContainer>
				{files.map(file => <File key={file.id} {...file} renameFile={renameFile} delFile={delFile}/>)}
				<FileInput addFile={addFile}/>
			</BlockContainer>
		</Container>
	);
};

export default Files;