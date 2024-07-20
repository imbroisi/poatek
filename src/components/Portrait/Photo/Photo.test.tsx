import { render, screen, fireEvent } from '@testing-library/react';
import { EmployeesContext } from 'contexts/employeesContext';
import Photo from './Photo';

describe('Photo component', () => {
  const mockEmployeesContext = {
    employeersChosen: [
      { headshot: { url: 'image1.jpg' }, curretEmployee: true },
      { headshot: { url: 'image2.jpg' }, curretEmployee: false },
    ],
    disabled: false,
  };

  test('renders two images with correct URLs', () => {
    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Photo index={0} onClick={() => {}} />
      </EmployeesContext.Provider>
    );

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'image1.jpg');
    expect(images[1]).not.toHaveAttribute('src', 'image2.jpg');
  });

  test('calls onClick with true when clicked on the active image', () => {
    const handleClick = jest.fn();
    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Photo index={0} onClick={handleClick} />
      </EmployeesContext.Provider>
    );

    const activeImage = screen.getAllByRole('img')[0];
    fireEvent.click(activeImage);

    expect(handleClick).toHaveBeenCalledWith(true);
  });

  test('calls onClick with false when clicked on the inactive image', () => {
    const handleClick = jest.fn();
    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Photo index={1} onClick={handleClick} />
      </EmployeesContext.Provider>
    );

    const inactiveImage = screen.getAllByRole('img')[1];
    fireEvent.click(inactiveImage);

    expect(handleClick).toHaveBeenCalledWith(false);
  });

  test('disables images when disabled is true', () => {
    mockEmployeesContext.disabled = true;
    render(
      <EmployeesContext.Provider value={mockEmployeesContext}>
        <Photo index={0} onClick={() => {}} />
      </EmployeesContext.Provider>
    );

    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('disabled');
    expect(images[1]).toHaveAttribute('disabled');
  })
});
