
import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: #88a4d4;
  border: 2px solid #88a4d4;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.3s all ease-out;

  &:hover {
    background-color: #88a4d4;
    color: white;
  }
`;

const ButtonBorderless = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  color: #88a4d4;
  margin: 0 0.5em;
  padding: 0.25em 1em;
  transition: 0.3s all ease-out;
  border: none;
  &:hover {
    
    color: black;
  }
`;

const ButtonBorderlessArray = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  color: #88a4d4;
  padding: 0.25em 0.5em;
  transition: 0.3s all ease-out;
  border: none;
  &:hover {
    
    color: black;
  }
`;

export { Button, ButtonBorderless, ButtonBorderlessArray}