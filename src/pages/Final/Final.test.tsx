import { fireEvent, render, screen } from '@testing-library/react';
import { EmployeesContext } from 'contexts/employeesContext';
import Final from './Final';
import { mockEmployeesContext } from 'mocks';
import { STEPS } from 'constant';

describe('Final', () => {
  test('should render the final screen when show prop is true', () => {
    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Final show={true} onChangeStep={() => {}} />
      </EmployeesContext.Provider>
    );

    const finalScreen = screen.getByTestId('final-component');
    expect(finalScreen).toBeInTheDocument();
  });

  test('should not render the final screen when show prop is false', () => {
    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Final show={false} onChangeStep={() => {}} />
      </EmployeesContext.Provider>
    );

    const finalScreen = screen.queryByTestId('final-component');
    expect(finalScreen).not.toBeInTheDocument();
  });

  test('should display the correct score', () => {
    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Final show={true} onChangeStep={() => {}} />
      </EmployeesContext.Provider>
    );

    const scoreText = screen.getByText(/you scored/i);
    expect(scoreText).toBeInTheDocument();
  });

  test('should call onChangeStep when "Return to Home" button is clicked', () => {
    const onChangeStepMock = jest.fn();

    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Final show={true} onChangeStep={onChangeStepMock} />
      </EmployeesContext.Provider>
    );

    const returnButton = screen.getByText(/return to home/i);
    fireEvent.click(returnButton);

    expect(onChangeStepMock).toHaveBeenCalledWith(STEPS.HOME);
  });
});
