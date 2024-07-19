import styled from 'styled-components';
import ButtonOriginal from '../../../components/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  width: 100vw;
  box-sizing: border-box;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50vh;
  padding: 12px 0 200px;
  box-sizing: border-box;
`

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50vh;
  background-color: #fff;
  color: #223547;
  box-sizing: border-box;
`

export const Button = styled(ButtonOriginal)`
  position: absolute;
  margin-top: -28px;
`;

export const Congrats = styled.div`
  font-size: 40px;
  font-weight: 700;
  width: 324px;
  height: 30px;
`;

export const Statistics = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
  width: 870px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Value = styled.div`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 16px;
`
