import styled from "styled-components";

export const BoardContainer = styled.div`
  background: #035a91;
  color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;

  width: 30vw;
  min-width: 160px;
  max-width: 250px;
  height: 8rem;
  padding: 5px 8px;

  margin-right: 1.5vw;
  margin-bottom: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    margin-left: 5px;
    fill: #f0f0f0;
  }
`;