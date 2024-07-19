import styled from 'styled-components';

interface ContainerProps {
  show: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 0;
  visibility: ${({ show }) => show ? 'visible' : 'hidden !important'};
  width: 100vw;
  color: #223547;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 104px;
`;

export const BackIcon = styled.img`
  position: absolute;
  left: 46px;
  width: 12px;
  height: 20px;
  cursor: pointer;
`;

export const NameGameImage = styled.img`
  width: 324px;
  height: 30px;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 104px);
  background-color: #fff;
  padding: 36px;
  gap: 40px;
`
export const Name = styled.div`
  font-size: 40px;
  font-weight: 700;
  margin: -20px 0 10px;
`;
