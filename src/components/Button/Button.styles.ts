import styled from 'styled-components';

export const Button = styled.button`
  width: 360px;
  height: 56px;
  border: none;
  background-color: ${({ disabled }) => disabled ? '#c8d8e8': '#005a90'};
  color: #fff;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ disabled }) => disabled ? 'unset' : 'pointer'};
`;

