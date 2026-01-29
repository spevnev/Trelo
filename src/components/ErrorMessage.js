import styled from "styled-components";

const ErrorMessage = styled.p`
    font-size: 12px;
    color: #ff5e5e;
    margin: 2px 4px;

    ${(props) => props.$fixedHeight && "height: 12px;"}
`;

export default ErrorMessage;
