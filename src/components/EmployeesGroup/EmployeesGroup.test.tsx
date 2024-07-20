import { render, screen } from '@testing-library/react';
import EmployeesGroup from './EmployeesGroup';

describe('EmployeesGroup component', () => {
  test('renders 6 Portrait components', () => {
    render(<EmployeesGroup />);

    const portraitComponents = screen.getAllByTestId('result-mask');
    expect(portraitComponents).toHaveLength(6);
  });
});
