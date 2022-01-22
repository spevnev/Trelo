import React, {useRef} from "react";
import styled from "styled-components";

import cross from "../../assets/svg/cross.svg";
import download from "../../assets/svg/download.svg";

import {Container, SubTitle} from "./styles";

const BlockContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const File = styled.div`
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

const Files = () => {
	const input = useRef(null);

	const preventDefault = e => e.preventDefault();
	const onDrop = e => {
		input.current.files = e.dataTransfer.files;
		onFile({target: input.current});
		e.preventDefault();
	};

	const onFile = e => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				// reader.result
			};
		}
	};

	const downloadFile = e => {
	};

	const deleteFile = e => {
	};

	return (
		<Container>
			<SubTitle>Attached files</SubTitle>
			<BlockContainer>
				<File>
					<p>Filename.something</p>
					<Icon src={download} onClick={downloadFile}/>
					<Icon src={cross} onClick={deleteFile}/>
				</File>
				<File>
					<p>Filename.something</p>
					<Icon src={download} onClick={downloadFile}/>
					<Icon src={cross} onClick={deleteFile}/>
				</File>
				<File>
					<p>Filename.something</p>
					<Icon src={download} onClick={downloadFile}/>
					<Icon src={cross} onClick={deleteFile}/>
				</File>

				<input ref={input} style={{display: "none"}} id="upload" type="file" onChange={onFile}/>
				<label htmlFor="upload"><AddFile onDragOver={preventDefault} onDragEnter={preventDefault} onDrop={onDrop}>Add file</AddFile></label>
			</BlockContainer>
		</Container>
	);
};

export default Files;