import React from "react";
import styled from "styled-components";
import dropDown from "../assets/svg/arrow_drop_down.svg";

const SelectContainer = styled.div`
  position: relative;
  border: 1px solid #000;
  border-radius: 2px;
  background: #fdfdfd;
`;

const StyledSelect = styled.select`
  outline: none;
  appearance: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 2px 16px 2px 4px;
  font-size: 1.6rem;
`;

const Icon = styled.img`
  position: absolute;
  pointer-events: none;
  right: -4px;
`;

const SelectInput = ({initial, options, onSelect}) => {
	const onChange = e => onSelect(e.target.value);

	return (
		<SelectContainer>
			<StyledSelect onChange={onChange}>
				<option value={initial.value}>{initial.text}</option>
				{options.map(cur =>
					<option value={cur.value} key={cur.value}>{cur.text}</option>,
				)}
			</StyledSelect>

			<Icon src={dropDown}/>
		</SelectContainer>
	);
};

export default SelectInput;