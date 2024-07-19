import { Container } from './EmployeesGroup.styles';
import Portrait from '../Portrait';

export default function EmployeesGroup() {
  return (
    <Container>
      {
        [...Array(6)].map((_, index) => (
          <Portrait key={index} index={index} />
        ))
      }
    </Container>
  );
}
