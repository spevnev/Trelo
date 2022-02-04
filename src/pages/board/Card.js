import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router";
import textIcon from "../../assets/svg/paragraph-left.svg";
import imageIcon from "../../assets/svg/image.svg";
import imagesIcon from "../../assets/svg/images.svg";
import fileIcon from "../../assets/svg/file-empty.svg";
import filesIcon from "../../assets/svg/files-empty.svg";
import {Draggable} from "react-beautiful-dnd";

const CardContainer = styled.div`
  margin-bottom: 10px;
  background: #fbfbfb;
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 1.6rem;
  cursor: pointer;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 3px;
`;

const Icon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 5px;
`;

const UserIcon = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-left: 2px;
`;


const Card = ({title, id, description, images, assigned, files, i}) => {
	const navigate = useNavigate();


	return (
		<Draggable draggableId={id} index={i}>
			{provided => (<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
				<CardContainer onClick={() => navigate(`${id}`)}>
					<p>{title}</p>

					<SubContainer>
						<div>
							{description.length > 0 && <Icon src={textIcon}/>}
							{images.length > 0 && (images.length === 1 ? <Icon src={imageIcon}/> : <Icon src={imagesIcon}/>)}
							{files.length > 0 && (files.length === 1 ? <Icon src={fileIcon}/> : <Icon src={filesIcon}/>)}
						</div>

						<div>
							{assigned.map(cur => <UserIcon key={cur.username} title={cur.username} src={cur.userIcon}/>)}
						</div>
					</SubContainer>
				</CardContainer>
			</div>)}
		</Draggable>
	);
};

export default Card;