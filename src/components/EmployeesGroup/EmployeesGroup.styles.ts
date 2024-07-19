import styled from 'styled-components';

interface ContainerProps {
  visible: boolean;
}

export const Container = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px 40px;
  width: fit-content;
`;
