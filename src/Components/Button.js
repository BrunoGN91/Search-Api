import React from 'react';
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

export default Button