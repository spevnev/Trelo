import React, {forwardRef} from "react";
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
  padding: 2px 20px 2px 4px;
  font-size: 16px;
`;

const Icon = styled.img`
  position: absolute;
  pointer-events: none;
  right: 2px;
  top: 6px;
  width: 15px;
  height: 15px;
`;


const SelectInput = forwardRef(({initialOption, options, onSelect, className}, ref) => (
	<SelectContainer className={className}>
		<StyledSelect ref={ref} onChange={e => onSelect(e.target.value)}>
			<option value={initialOption.value}>{initialOption.text}</option>

			{options.map(option =>
				<option value={option.value} key={option.value}>{option.text}</option>,
			)}
		</StyledSelect>

		<Icon src={dropDown}/>
	</SelectContainer>
));

export default SelectInput;