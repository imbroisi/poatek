import { render, screen, fireEvent } from '@testing-library/react';
import { EmployeesContext } from 'contexts/employeesContext';
import Portrait from './Portrait';
import { mockEmployeesContext } from 'mocks';

describe('Portrait', () => {
  test('should call setDisabled with true', () => {
    const setDisabledMock = jest.fn();
    const addAttemptsMock = jest.fn();
    const addCorrectAnswersMock = jest.fn();

    render(
      <EmployeesContext.Provider
        value={{
          ...mockEmployeesContext,
          setDisabled: setDisabledMock,
          addAttempts: addAttemptsMock,
          addCorrectAnswers: addCorrectAnswersMock,
        }}
      >
        <Portrait index={0} />
      </EmployeesContext.Provider>
    );

    const photo = screen.getAllByRole('img')[0];    

    fireEvent.click(photo);

    expect(setDisabledMock).toHaveBeenCalledWith(true);
  });

  test('should call addAttempts', () => {
    const setDisabledMock = jest.fn();
    const addAttemptsMock = jest.fn();
    const addCorrectAnswersMock = jest.fn();

    render(
      <EmployeesContext.Provider
        value={{
          ...mockEmployeesContext,
          setDisabled: setDisabledMock,
          addAttempts: addAttemptsMock,
          addCorrectAnswers: addCorrectAnswersMock,
        }}
      >
        <Portrait index={0} />
      </EmployeesContext.Provider>
    );

    const photo = screen.getAllByRole('img')[0];    
    fireEvent.click(photo);

    expect(addAttemptsMock).toHaveBeenCalled();
  });

  test('should call addCorrectAnswers when isRightChoice is true', () => {
    const setDisabledMock = jest.fn();
    const addAttemptsMock = jest.fn();
    const addCorrectAnswersMock = jest.fn();

    render(
      <EmployeesContext.Provider
        value={{
          ...mockEmployeesContext,
          setDisabled: setDisabledMock,
          addAttempts: addAttemptsMock,
          addCorrectAnswers: addCorrectAnswersMock,
        }}
      >
        <Portrait index={0} />
      </EmployeesContext.Provider>
    );

    const photo = screen.getAllByRole('img')[0];    
    fireEvent.click(photo);

    expect(addCorrectAnswersMock).toHaveBeenCalled();
  });

  test('should call setDisabled with false after 2000ms', () => {
    jest.useFakeTimers();

    const setDisabledMock = jest.fn();
    const addAttemptsMock = jest.fn();
    const addCorrectAnswersMock = jest.fn();

    render(
      <EmployeesContext.Provider
        value={{
          ...mockEmployeesContext,
          setDisabled: setDisabledMock,
          addAttempts: addAttemptsMock,
          addCorrectAnswers: addCorrectAnswersMock,
        }}
      >
        <Portrait index={0} />
      </EmployeesContext.Provider>
    );

    const photo = screen.getAllByRole('img')[0];    
    fireEvent.click(photo);

    expect(setDisabledMock).toHaveBeenCalledWith(true);

    jest.advanceTimersByTime(2000);

    expect(setDisabledMock).toHaveBeenCalledWith(false);
  });

  test('should call getSixEmployees after 2000ms', () => {
    jest.useFakeTimers();

    const setDisabledMock = jest.fn();
    const addAttemptsMock = jest.fn();
    const addCorrectAnswersMock = jest.fn();
    const getSixEmployeesMock = jest.fn();

    render(
      <EmployeesContext.Provider
        value={{
          ...mockEmployeesContext,
          setDisabled: setDisabledMock,
          addAttempts: addAttemptsMock,
          addCorrectAnswers: addCorrectAnswersMock,
          getSixEmployees: getSixEmployeesMock,
        }}
      >
        <Portrait index={0} />
      </EmployeesContext.Provider>
    );

    const photo = screen.getAllByRole('img')[0];    
    fireEvent.click(photo);

    expect(getSixEmployeesMock).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000);

    expect(getSixEmployeesMock).toHaveBeenCalled();
  });
});