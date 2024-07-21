import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { EmployeesContext } from 'contexts/employeesContext';
import { mockEmployeesContext } from 'mocks';

describe('App', () => {
  test('should render Home component by default', () => {
    render(<App />);
    const homeComponent = screen.getByTestId('home-component');
    expect(homeComponent).toBeInTheDocument();
  });

  test('should render Board component when step is set to BOARD', () => {
    render(<App />);
    const boardButton = screen.getByRole('button', { name: 'Play!' });
    fireEvent.click(boardButton);
    const boardComponent = screen.getByTestId('board-component');
    expect(boardComponent).toBeInTheDocument();
  });

  test('should render Final component when step is set to FINAL', () => {
    render(
      <EmployeesContext.Provider value={{ ...mockEmployeesContext, attempts: 10 }}>
        <App />
      </EmployeesContext.Provider>
    );

    const boardButton = screen.getByRole('button', { name: 'Play!' });
    fireEvent.click(boardButton);

    const continueButtonElement = screen.getByRole('button', { name: 'Continue' });     
    fireEvent.click(continueButtonElement);
    const finalComponent = screen.getByTestId('final-component');
    expect(finalComponent).toBeInTheDocument();
  });
});
