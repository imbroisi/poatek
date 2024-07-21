import { render, screen, fireEvent } from '@testing-library/react';
import { EmployeesContext } from 'contexts/employeesContext';
import Home from './Home';
import { STEPS } from 'constant';
import { mockEmployeesContext } from 'mocks';

describe('Home', () => {
  test('should render the home banner', () => {
    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Home show={true} onChangeStep={jest.fn()} />
      </EmployeesContext.Provider>
    );

    const banner = screen.getByAltText('The Name Game');
    expect(banner).toBeInTheDocument();
  });

  test('should render the play button', () => {
    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Home show={true} onChangeStep={jest.fn()} />
      </EmployeesContext.Provider>
    );

    const playButton = screen.getByText('Play!');
    expect(playButton).toBeInTheDocument();
  });

  test('should call onChangeStep when the play button is clicked', () => {
    const onChangeStepMock = jest.fn();

    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Home show={true} onChangeStep={onChangeStepMock} />
      </EmployeesContext.Provider>
    );

    const playButton = screen.getByText('Play!');
    fireEvent.click(playButton);

    expect(onChangeStepMock).toHaveBeenCalledWith(STEPS.BOARD);
  });

  test('should not render anything when show prop is false', () => {
    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Home show={false} onChangeStep={jest.fn()} />
      </EmployeesContext.Provider>
    );

    const container = screen.queryByTestId('home-container');
    expect(container).not.toBeInTheDocument();
  });
});