import styled from "styled-components";
import SelectInput from "../../components/SelectInput";

export const SubTitle = styled.p`
  font-size: 16px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Select = styled(SelectInput)`
  border: none;
  background: none;
  border-bottom: 1px solid #000;
  border-radius: 0;
  width: fit-content;
`;