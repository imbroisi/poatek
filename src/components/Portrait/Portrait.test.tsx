import { render, screen, fireEvent, act } from '@testing-library/react';
import { EmployeesContext } from 'contexts/employeesContext';
import Portrait from './Portrait';

describe('Portrait component', () => {
  const mockEmployeesContext = {
    employeersChosen: [
      { headshot: { url: 'image1.jpg' }, curretEmployee: true },
      { headshot: { url: 'image2.jpg' }, curretEmployee: false },
    ],
    disabled: false,
    setDisabled: jest.fn(),
    getSixEmployees: jest.fn(),
    addAttempts: jest.fn(),
    addCorrectAnswers: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
  });

  test('renders Photo and ResultMask components', () => {
    const { container } = render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Portrait index={0} />
      </EmployeesContext.Provider>
    );

    const photo = container.querySelector('img[src="image1.jpg"]');
    expect(photo).toBeInTheDocument();

    expect(screen.getByTestId('result-icon')).toBeInTheDocument();
  });

  test('calls setDisabled and addAttempts when Photo is clicked', () => {
    const { container } = render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Portrait index={0} />
      </EmployeesContext.Provider>
    );

    const photo = container.querySelector('img[src="image1.jpg"]');
    if (photo) {
      fireEvent.click(photo);
    }

    expect(mockEmployeesContext.setDisabled).toHaveBeenCalledWith(true);
    expect(mockEmployeesContext.addAttempts).toHaveBeenCalled();
  });

  test('calls addCorrectAnswers when Photo is clicked with isRightChoice=true', () => {
    const { container } = render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Portrait index={0} />
      </EmployeesContext.Provider>
    );

    const photo = container.querySelector('img[src="image1.jpg"]');
    if (photo) {
      fireEvent.click(photo);
    }

    expect(mockEmployeesContext.addCorrectAnswers).toHaveBeenCalled();
  });

  test('calls setDisabled and getSixEmployees after 2 seconds', () => {
    const { container } = render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Portrait index={0} />
      </EmployeesContext.Provider>
    );

    const photo = container.querySelector('img[src="image1.jpg"]');
    if (photo) {
      fireEvent.click(photo);
    }

    expect(mockEmployeesContext.setDisabled).toHaveBeenCalledWith(true);
    expect(mockEmployeesContext.getSixEmployees).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockEmployeesContext.setDisabled).toHaveBeenCalledWith(false);
    expect(mockEmployeesContext.getSixEmployees).toHaveBeenCalled();
  });

  test('clears timeout when component is unmounted', () => {  
    jest.spyOn(global, 'clearTimeout').mockImplementation(() => {});

    const { unmount } = render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Portrait index={0} />
      </EmployeesContext.Provider>
    );

    unmount();

    expect(clearTimeout).toHaveBeenCalled();
  });

  test('clears timeout when component is unmounted', () => {  
    jest.spyOn(global, 'clearTimeout').mockImplementation(() => {});

    const { unmount } = render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Portrait index={0} />
      </EmployeesContext.Provider>
    );

    unmount();

    expect(clearTimeout).toHaveBeenCalled();
  });

  test('shows ResultMask when showResult is true', () => {
    const { container } = render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Portrait index={0} />
      </EmployeesContext.Provider>
    );

    expect(screen.getByTestId('result-mask')).toHaveStyle('display: none');

    const photo = container.querySelector('img[src="image1.jpg"]');
    act(() => {
      if (photo) {
        fireEvent.click(photo);
      }
    });

    expect(screen.getByTestId('result-mask')).toHaveStyle('display: flex');
  });

  test('hides ResultMask when disabled is true', () => {
    mockEmployeesContext.disabled = true;

    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Portrait index={0} />
      </EmployeesContext.Provider>
    );

    expect(screen.getByTestId('result-mask')).toHaveStyle('display: none');
  });
});
