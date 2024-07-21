import styled from 'styled-components';
import { PHOTO_WIDTH, PHOTO_HEIGHT } from '../ResultMask/ResultMask.styles';

export const Container = styled.div`
  position: relative;
  width: ${PHOTO_WIDTH}px;
  height: ${PHOTO_HEIGHT}px;
`;

interface PhotoProps {
  disabled: boolean;
}
