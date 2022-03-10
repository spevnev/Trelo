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
  background: #fff;
  box-shadow: 0 1px 0 rgba(0, 0, 0, .25);
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 16px;
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
  width: 18px;
  height: 18px;
  margin-right: 5px;
`;

const UserIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 2px;
`;


const Card = ({title, id, description, images, assigned, files, idx, users}) => {
	const navigate = useNavigate();


	const hasDescription = description.length > 0;
	const hasImage = images.length === 1;
	const hasImages = images.length > 0;
	const hasFile = files.length === 1;
	const hasFiles = files.length > 0;

	const assignedUsers = users.filter(user => assigned.indexOf(user.username) !== -1);

	return (
		<Draggable draggableId={id} index={idx}>{provided => (
			<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
				<CardContainer onClick={() => navigate(`${id}`)}>
					<p>{title}</p>

					<SubContainer>
						<div>
							{hasDescription && <Icon src={textIcon}/>}
							{hasImages && <Icon src={hasImage ? imageIcon : imagesIcon}/>}
							{hasFiles && <Icon src={hasFile ? fileIcon : filesIcon}/>}
						</div>

						<div>
							{assignedUsers.map(user => <UserIcon key={user.username} title={user.username} src={user.icon}/>)}
						</div>
					</SubContainer>
				</CardContainer>
			</div>
		)}</Draggable>
	);
};

export default Card;