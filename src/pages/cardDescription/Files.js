import React, {useRef, useState} from "react";
import styled from "styled-components";
import cross from "../../assets/svg/cross.svg";
import download from "../../assets/svg/download.svg";
import {Container, SubTitle} from "./styles";
import HiddenInput from "../../components/HiddenInput";
import {useDispatch} from "react-redux";
import {addFiles, deleteFile} from "../../redux/actionCreators/cardActionCreator";
import bundle from "../../services/";
import PopUp from "../../components/PopUp";

const ErrorMessage = styled.p`
  font-size: 12px;
  color: #ff5e5e;
  margin: 1px 2px;
`;

const FileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 40rem;
  width: 95vw;

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
  width: 25rem;
  height: 3rem;
  background: #eee;
  border-radius: 5px;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    filter: brightness(90%);
  }
`;

const DropOverlay = styled(AddFile)`
  font-size: 1.8rem;
  border: 2px dashed #000;
`;


const File = ({filename, delFile, renameFile, url}) => {
	const [msg, setMsg] = useState(null);


	const downloadFile = () => bundle.file.downloadFile(url, filename);

	const rename = e => {
		if (e.target.value.length === 0) setMsg("File name can't be empty!");
		else setMsg(null);

		renameFile(url, e.target.value);
	};


	return (
		<>
			<FileContainer>
				<HiddenInput placeholder="File name" onChange={rename} value={filename}/>
				<Icon src={download} onClick={downloadFile}/>
				<Icon src={cross} onClick={() => delFile(url)}/>
			</FileContainer>

			<ErrorMessage>{msg}</ErrorMessage>
		</>
	);
};

const FileInput = ({addFiles, overlay, setUploading}) => {
	const input = useRef(null);


	const preventDefault = e => e.preventDefault();

	const onDrop = e => {
		input.current.files = e.dataTransfer.files;
		onFile({target: input.current});
		e.preventDefault();
	};

	const onFile = e => {
		const files = e.target.files;

		const arr = [];
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			setUploading(true);
			reader.onload = () => {
				arr.push({filename: file.name, data: reader.result});
				if (arr.length === files.length) addFiles(arr);
			};
		}
	};


	return (
		<>
			<input maxLength={32} ref={input} style={{display: "none"}} id="uploadFile" type="file" accept="*/*" onChange={onFile} multiple/>
			<label htmlFor="uploadFile" onDragOver={preventDefault} onDragEnter={preventDefault} onDrop={onDrop}>
				{overlay ? <DropOverlay>Drop here to add file</DropOverlay> : <AddFile>Add file</AddFile>}
			</label>
		</>
	);
};

const Files = ({state, boardId, commitChanges, overlay, setSaved}) => {
	const dispatch = useDispatch();
	const [isShown, setShown] = useState(false);


	const setUploading = bool => {
		setShown(bool);
		setSaved(!bool);
	};

	const delFile = url => dispatch(deleteFile(boardId, state.id, url));

	const addFilesLoc = files => dispatch(addFiles(boardId, state.id, files, setUploading));

	const renameFileLoc = (url, newFilename) => commitChanges({...state, files: state.files.map(cur => cur.url === url ? {...cur, filename: newFilename} : cur)});


	return (
		<Container>
			<SubTitle>Attached files</SubTitle>

			<BlockContainer>
				{state.files.map(file => <File key={file.url} {...file} renameFile={renameFileLoc} delFile={delFile}/>)}

				{state.files.length < 10 && <FileInput setUploading={setUploading} addFiles={addFilesLoc} overlay={overlay}/>}
			</BlockContainer>

			<PopUp isShown={isShown}>Uploading file... It might take a few seconds.</PopUp>
		</Container>
	);
};

export default Files;