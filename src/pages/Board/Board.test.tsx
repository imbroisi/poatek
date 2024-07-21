import { render, screen, fireEvent } from '@testing-library/react';
import { EmployeesContext } from 'contexts/employeesContext';
import Board from './Board';
import { mockEmployeesContext } from 'mocks';
import { STEPS } from 'constant';

describe('Board', () => {
  test('should render the component', () => {
    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Board show={true} onChangeStep={() => {}} />
      </EmployeesContext.Provider>
    );

    const boardElement = screen.getByTestId('board-component');
    const nameElement = screen.queryByText(/try matching the willowtree/i);
    const buttonElement = screen.getByRole('button', { name: 'Continue' });

    expect(boardElement).toHaveStyle('visibility: visible');
    expect(nameElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('should not show the Board', () => {
    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Board show={false} onChangeStep={() => {}} />
      </EmployeesContext.Provider>
    );

    const boardElement = screen.getByTestId('board-component');

    expect(boardElement).toBeInTheDocument();
    expect(boardElement).toHaveStyle('visibility: hidden');
  });

  test('should call onChangeStep when the back icon is clicked', () => {
    const onChangeStepMock = jest.fn();

    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Board show={true} onChangeStep={onChangeStepMock} />
      </EmployeesContext.Provider>
    );

    const backIconElement = screen.getByTitle('Go Home');
    fireEvent.click(backIconElement);

    expect(onChangeStepMock).toHaveBeenCalledWith(STEPS.HOME);
  });

  test('should call onChangeStep when the Continue button is clicked', () => {
    const onChangeStepMock = jest.fn();

    render(
      <EmployeesContext.Provider value={{...mockEmployeesContext, attempts: 10}}>
        <Board show={true} onChangeStep={onChangeStepMock} />
      </EmployeesContext.Provider>
    );

    const continueButtonElement = screen.getByRole('button', { name: 'Continue' });    
    fireEvent.click(continueButtonElement);
    expect(onChangeStepMock).toHaveBeenCalledWith(STEPS.FINAL);
  });

  test('should disable the Continue button when attempts is less than 5', () => {
    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Board show={true} onChangeStep={() => {}} />
      </EmployeesContext.Provider>
    );

    const continueButtonElement = screen.getByRole('button', { name: 'Continue' });

    expect(continueButtonElement).toBeDisabled();
  });
});
