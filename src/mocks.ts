import { Context, Employee } from 'types/Employees.types';

export const mockEmployeersChosen: Employee[] =
[...Array(6)].map((_, index) => ({
    headshot: {
      id: `image${index}`,
      url: `image${index}.jpg`,
      alt: `Image ${index}`,
      width: 100,
      height: 100,
      mimeType: 'image/jpeg',
      type: 'image',
    },
    curretEmployee: index === 0,
    firstName: 'John',
    id: `id${index}`,
    jobTitle: 'dev',
    lastName: 'Doe',
    slug: 'JD',
    socialLinks: [],
    type: 'CLT'
  })
);

export const mockEmployeesContext: Context = {
  employeersChosen: mockEmployeersChosen,
  disabled: false,
  setDisabled: jest.fn(),
  getSixEmployees: jest.fn(),
  attempts: 0,
  addAttempts: jest.fn(),
  reset: jest.fn(),
  correctAnswers: 0,
  addCorrectAnswers: jest.fn(),
};
