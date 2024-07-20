import { renderHook, act } from '@testing-library/react';
import EmployeesProvider, { EmployeesContext } from 'contexts/employeesContext';
import { Employee } from 'types/Employees.types';

const mockEmployeesContext = {
  employeersChosen: [
    { headshot: { url: 'image1.jpg' }, curretEmployee: true },
    { headshot: { url: 'image2.jpg' }, curretEmployee: false },
    { headshot: { url: 'image2.jpg' }, curretEmployee: false },
    { headshot: { url: 'image2.jpg' }, curretEmployee: false },
    { headshot: { url: 'image2.jpg' }, curretEmployee: false },
    { headshot: { url: 'image2.jpg' }, curretEmployee: false },
  ],
  disabled: false,
  setDisabled: jest.fn(),
  getSixEmployees: jest.fn(),
  addAttempts: jest.fn(),
  addCorrectAnswers: jest.fn(),
  reset: jest.fn(),
  correctAnswers: 0,
  attempts: 0,
};

jest.mock('../api/useFetchGet');

const firstNames = [
  'Luiz',
  'Gustavo',
  'Benicio',
  'Barbara',
  'Bianca',
  'Brenda',
  'Guilherme',
  'Apolo',
  'Cassandra',
  'Pink',
  'Buba',
  'Cascão',
  'Ender',
]



const gameData = firstNames.map((firstName) => (
  {
    "firstName": firstName,
    "headshot": {
      "alt": "ameir al-zoubi",
      "height": 500,
      "id": "79PkYrx56H2EhTJDmIxBTk",
      "mimeType": "image/jpeg",
      "type": "image",
      "url": "https://namegame.willowtreeapps.com/images/ameir.jpeg",
      "width": 500
    },
    "id": "3WCYqVR963Q4hB7pH9YVxe",
    "jobTitle": "Staff Software Engineer",
    "lastName": "Al-Zoubi",
    "slug": "al-zoubi",
    "socialLinks": [],
    "type": "people"
  }
));

describe('EmployeesContext', () => {
  const mockUseFetchGet = require('../api/useFetchGet');

  test('should initialize with default values', () => {
    mockUseFetchGet.default.mockReturnValue([gameData]);

    const wrapper = ({ children }: any) => (
      <EmployeesContext.Provider value={mockEmployeesContext}>{children}</EmployeesContext.Provider>
    );
    const { result } = renderHook(() => EmployeesProvider(mockEmployeesContext), {
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
      <EmployeesContext.Provider value={mockEmployeesContext}>{children}</EmployeesContext.Provider>
    );
    const { result } = renderHook(() => EmployeesProvider(mockEmployeesContext), {
      wrapper,
    });

    act(() => {
      result.current.props.value.setDisabled(true);

    });

    expect(result.current.props.value.disabled).toBe(true);
  });

  test('should get six employees', () => {
    // import useFetchGet from '../api/useFetchGet';
    // const mockUseFetchGet = require('../api/useFetchGet');
    mockUseFetchGet.default.mockReturnValue([gameData]);

    const wrapper = ({ children }: any) => (
      <EmployeesContext.Provider value={mockEmployeesContext}>{children}</EmployeesContext.Provider>
    );
    const { result } = renderHook(() => EmployeesProvider(mockEmployeesContext), {
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
      <EmployeesContext.Provider value={mockEmployeesContext}>{children}</EmployeesContext.Provider>
    );

    const { result } = renderHook(() => EmployeesProvider(mockEmployeesContext), {
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


