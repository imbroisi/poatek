import { render, screen } from '@testing-library/react';
import ResultMask from './ResultMask';

describe('ResultMask component', () => {
  test('renders correct icon when isRightChoice is true', () => {
    render(<ResultMask showResult isRightChoice />);
    const icon = screen.getByTestId('result-icon');
    expect(icon.getAttribute('src')).toBe('correct.svg');
  });

  test('renders error icon when isRightChoice is false', () => {
    render(<ResultMask showResult={true} isRightChoice={false} />);
    const icon = screen.getByTestId('result-icon');
    expect(icon.getAttribute('src')).toBe('error.svg');
  });

  test('does not render when showResult is false', () => {
    render(<ResultMask showResult={false} isRightChoice={true} />);
    const container = screen.queryByTestId('result-mask');
    expect(container).not.toBeNull();
  });
});
