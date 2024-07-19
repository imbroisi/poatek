import { useContext, useEffect, useRef, useState } from 'react';
import { Container } from './Portrait.styles';
import Photo from './Photo';
import ResultMask from './ResultMask';
import { EmployeesContext } from '../../contexts/employeesContext';

interface Props {
  index: number;
}

interface RightChoise {
  isRightChoice: boolean
}

export default function Portrait({ index }: Props) {
  const { disabled, setDisabled, getSixEmployees } = useContext(EmployeesContext);
  const [showResult, setShowResult] = useState<RightChoise | null>(null);
  const timeoutControl = useRef<NodeJS.Timeout | undefined>();

  const handleOnClick = (isRightChoice: boolean) => {
    setShowResult({ isRightChoice });
    setDisabled(true);

    timeoutControl.current = setTimeout(() => {
      setDisabled(false);
      getSixEmployees();
    }, 3000);
  }

  useEffect(() => {
    return () => clearTimeout(timeoutControl.current);
  }, []);

  useEffect(() => {
    if (!disabled) {
      setShowResult(null);
    }
  }, [disabled]);

  return (
    <Container>
      <Photo index={index} onClick={handleOnClick} />
      <ResultMask
        showResult={!!showResult}
        isRightChoice={!!showResult?.isRightChoice}
      />
    </Container>
  );
}
