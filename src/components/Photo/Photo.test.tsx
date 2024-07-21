import { render, screen, fireEvent } from '@testing-library/react';
import { EmployeesContext } from 'contexts/employeesContext';
import Photo from './Photo';
import { mockEmployeesContext } from 'mocks';

describe('Photo', () => {
  test('should render two images', () => {
    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Photo index={0} onClick={() => {}} />
      </EmployeesContext.Provider>
    );

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);
  });

  test('should call onClick with true when clicked', () => {
    const onClickMock = jest.fn();

    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Photo index={0} onClick={onClickMock} />
      </EmployeesContext.Provider>
    );

    const image = screen.getAllByRole('img')[0];    
    fireEvent.click(image);

    expect(onClickMock).toHaveBeenCalledWith(true);
  });

  test('should disable images when disabled prop is true', () => {
    render(
      <EmployeesContext.Provider value={{ ...mockEmployeesContext, disabled: true }}>
        <Photo index={0} onClick={() => {}} />
      </EmployeesContext.Provider>
    );

    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('disabled');
    expect(images[1]).toHaveAttribute('disabled');
  });
});
