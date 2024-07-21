import { renderHook, act } from '@testing-library/react';
import EmployeesProvider, { EmployeesContext } from 'contexts/employeesContext';
import { mockEmployeesContext, mockEmployeersChosen } from 'mocks';

jest.mock('../api/useFetchGet');

const gameData = [
  ...mockEmployeersChosen,
  ...mockEmployeersChosen
];

describe('EmployeesContext', () => {
  const mockUseFetchGet = require('../api/useFetchGet');

  test('should initialize with default values', () => {
    mockUseFetchGet.default.mockReturnValue([gameData]);

    const wrapper = ({ children }: any) => (
      <EmployeesContext.Provider value={mockEmployeesContext}>
        {children}
      </EmployeesContext.Provider>
    );
    const { result } = renderHook(() => EmployeesProvider(mockEmployeesContext as any), {
      wrapper,
    });

    expect(result.current.props.value.disabled).toBe(false);
    expect(result.current.props.value.employeersChosen.length).toEqual(6);
    expect(result.current.props.value.attempts).toBe(0);
    expect(result.current.props.value.correctAnswers).toBe(0);
  });

  test('should set disabled state', () => {
    mockUseFetchGet.default.mockReturnValue([gameData]);

    const wrapper = ({ children }: any) => (
      <EmployeesContext.Provider value={mockEmployeesContext}>
        {children}
      </EmployeesContext.Provider>
    );
    const { result } = renderHook(() => EmployeesProvider(mockEmployeesContext as any), {
      wrapper,
    });

    act(() => {
      result.current.props.value.setDisabled(true);
    });

    expect(result.current.props.value.disabled).toBe(true);
  });

  test('should get six employees', () => {
    mockUseFetchGet.default.mockReturnValue([gameData]);

    const wrapper = ({ children }: any) => (
      <EmployeesContext.Provider value={mockEmployeesContext}>
        {children}
      </EmployeesContext.Provider>
    );
    const { result } = renderHook(() => EmployeesProvider(mockEmployeesContext as any), {
      wrapper,
    });

    act(() => {
      result.current.props.value.getSixEmployees();
    });

    expect(result.current.props.value.employeersChosen.length).toBe(6);
  });

  test('should reset context values', () => {
    mockUseFetchGet.default.mockReturnValue([gameData]);

    const wrapper = ({ children }: any) => (
      <EmployeesContext.Provider value={mockEmployeesContext}>
        {children}
      </EmployeesContext.Provider>
    );

    const { result } = renderHook(() => EmployeesProvider(mockEmployeesContext as any), {
      wrapper,
    });

    act(() => {
      result.current.props.value.setDisabled(true);
      result.current.props.value.addAttempts();
      result.current.props.value.addCorrectAnswers();
      result.current.props.value.reset();
    });

    expect(result.current.props.value.disabled).toBe(false);
    expect(result.current.props.value.attempts).toBe(0);
    expect(result.current.props.value.correctAnswers).toBe(0);
  });
});


