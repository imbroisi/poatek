import styled, { keyframes } from 'styled-components';

const OPACITY_DISABLED = 0.6;

const fadeIn = keyframes`
  0% { opacity: 0 }
  30% { opacity: 0 }
  100% { opacity: 1 }
`
const fadeOut = keyframes`
  0% { opacity: ${OPACITY_DISABLED} }
  70% { opacity: 0 }
  100% { opacity: 0 }
`

interface ImageProps {
  disabled: boolean;
  active: boolean;
}

export const Image = styled.img<ImageProps>`
  position: absolute;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  opacity: ${({ disabled, active }) => (
    active ? (disabled ? OPACITY_DISABLED : 1) : 0
  )};
  z-index: ${({ active }) => active ? 1 : 0}; 
  pointer-events: ${({ disabled }) => disabled ? 'none' : 'unset'};
  animation-name: ${({ active }) => active ? fadeIn : fadeOut}; 
  animation-duration: 1s;

  &:hover {
    box-shadow: 0 0 11px rgba(33,33,33,.5); 
  }
`;
