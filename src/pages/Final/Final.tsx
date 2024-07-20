import { useContext } from 'react';
import { EmployeesContext } from 'contexts/employeesContext';
import { Bottom, Button, Congrats, Container, Top, Statistics, Item, Value } from './Final.styles';
import { STEPS } from 'constant';
import NameGameImage from 'components/NameGameImage';

interface Props {
  show: boolean;
  onChangeStep: (value: number) => void;
}

export default function Final ({ show, onChangeStep }: Props) {
  const { correctAnswers, attempts } = useContext(EmployeesContext);

  if (!show) {
    return null;
  }

  return (
    <Container data-testid="final-component">
      <Top>
        <NameGameImage alt="The Name Game" title="Final Screen" />
        <Congrats>
          Congratulations,
          you scored {correctAnswers}/{attempts}!
        </Congrats>
      </Top>
      <Bottom>
        <Button onClick={() => onChangeStep(STEPS.HOME)}>Return to Home</Button>
        <Statistics>
          <Item>
            <Value>
              {Math.round(100 * correctAnswers/attempts)}%
            </Value>
            Correct Selections
          </Item>
          <Item>
            <Value>
              {Math.round(100 * (1 - correctAnswers/attempts))}%
            </Value>
            Incorrect Selections
          </Item>
          <Item>
            <Value>
              TODO
            </Value>
            Avg Selection Time
          </Item>
        </Statistics>
      </Bottom>
    </Container>
  );
}
