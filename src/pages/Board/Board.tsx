import EmployeesGroup from 'components/EmployeesGroup';
import { Container, Header, BackIcon, Main, Name } from './Board.styles';
import backIcon from 'images/back-arrow.svg';
import { STEPS } from 'constant';
import { useContext } from 'react';
import { EmployeesContext } from 'contexts/employeesContext';
import Button from 'components/Button';
import NameGameImage from 'components/NameGameImage';

interface Props {
  show: boolean;
  onChangeStep: (value: number) => void;
}

export default function Board ({ show, onChangeStep }: Props) {
  const { employeersChosen, attempts } = useContext(EmployeesContext);

  const correctEmployee = employeersChosen.find((employeer) => !!employeer.curretEmployee)
  const name = `${correctEmployee?.firstName} ${correctEmployee?.lastName}`;

  return (
    <Container data-testid="board-component" show={show}>
      <Header>
        <BackIcon src={backIcon} onClick={() => onChangeStep(STEPS.HOME)} title="Go Home" />
        <NameGameImage alt="The Name Game" title="Home" />
      </Header>
      <Main>
        <div>Try matching the WillowTree employee to their photo.</div>
        <Name>{name}</Name>
        <EmployeesGroup />
        <Button
          disabled={attempts < 5}
          onClick={() => onChangeStep(STEPS.FINAL)}
        >
          Continue
        </Button>
      </Main>
    </Container>
  );
}
