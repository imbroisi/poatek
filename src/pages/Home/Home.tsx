import homeBanner from 'images/home-banner.svg';
import { STEPS } from 'constant';
import { Container, Logo } from './Home.styles';
import Button from 'components/Button';
import { useContext } from 'react';
import { EmployeesContext } from 'contexts/employeesContext';

interface Props {
  show: boolean;
  onChangeStep: (value: number) => void;
}

export default function Home({ show, onChangeStep }: Props) {
  const { reset } = useContext(EmployeesContext);

  if (!show) {
    return null;
  }

  reset();

  return (
    <Container data-testid="home-component">
      <Logo src={homeBanner} alt="The Name Game" />
      <h1>
        Try matching the WillowTree employee to their photo.
      </h1>
      <Button onClick={() => onChangeStep(STEPS.BOARD)}>Play!</Button>
    </Container>
  )
}
