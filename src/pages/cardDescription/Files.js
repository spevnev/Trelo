import React, {useRef} from "react";
import styled from "styled-components";
import cross from "../../assets/svg/cross.svg";
import download from "../../assets/svg/download.svg";
import {Container, SubTitle} from "./styles";

const FileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px 0;

  & p {
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

const File = ({filename, delFile}) => {
	const downloadFile = e => {
	};

	const deleteFile = () => delFile(filename);

	return (
		<FileContainer>
			<p>{filename}</p>
			<Icon src={download} onClick={downloadFile}/>
			<Icon src={cross} onClick={deleteFile}/>
		</FileContainer>
	);
};

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

const BlockContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Files = ({files, commitChanges}) => {
	const addFile = (filename, data) => {
		while (files.filter(file => file.filename === filename).length > 0) {
			const parts = filename.split(".");
			if (parts.length !== 1)
				parts[0] += Math.round(Math.random() * 100);
			filename = parts.join(".");
		}

		commitChanges({files: [...files, {filename, data}]});
	};

	const delFile = filename => commitChanges({files: files.filter(cur => cur.filename !== filename)});

	return (
		<Container>
			<SubTitle>Attached files</SubTitle>
			<BlockContainer>
				{files.map(file => <File key={file.filename} filename={file.filename} delFile={delFile}/>)}
				<FileInput addFile={addFile}/>
			</BlockContainer>
		</Container>
	);
};

export default Files;