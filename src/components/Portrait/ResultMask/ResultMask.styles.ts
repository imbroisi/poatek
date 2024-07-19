import styled from 'styled-components';

export const PHOTO_WIDTH = 260;
export const PHOTO_HEIGHT = 260;

interface ContainerProps {
  showResult?: boolean;
}

interface BackgroundProps {
  isRightChoice: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${PHOTO_WIDTH}px;
  height: ${PHOTO_HEIGHT}px;

  display: ${({ showResult }) => showResult ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.img`
  z-index: 99;
`

export const Background = styled.div<BackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;

  background-color: ${({ isRightChoice }) => isRightChoice ? '#00a000' : '#ff0000'};
`
