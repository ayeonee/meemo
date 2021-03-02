import styled from "styled-components";

// find way to use spread operator or as such to simplify code
export const EditButton: any = styled.button`
  position: fixed;
  right: 12vw;
  bottom: 10vh;

  outline: none;
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  height: 5.5em;
  width: 5.5em;
  font-size: 1em;

  background: #228be6;
  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7ed6;
  }
`;

export const DarkButton: any = styled.button`
  position: fixed;
  right: 5vw;
  bottom: 10vh;

  outline: none;
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  height: 5.5em;
  width: 5.5em;
  font-size: 1rem;

  background: #228be6;
  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7ed6;
  }
`;
