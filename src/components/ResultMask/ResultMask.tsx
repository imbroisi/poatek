import { Container, Background, Icon } from './ResultMask.styles';
import correctIcon from 'images/correct.svg';
import errorIcon from 'images/error.svg';

interface Props {
  showResult: boolean;
  isRightChoice: boolean;
};

export default function ResultMask({ showResult, isRightChoice }: Props) {
  const iconSrc = isRightChoice ? correctIcon : errorIcon;

  return (
    <Container showResult={showResult} data-testid="result-mask">
      <Background isRightChoice={isRightChoice} />
      <Icon src={iconSrc} width="120" height="120" data-testid="result-icon" />
    </Container>
  );
}
