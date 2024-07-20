import { render, screen } from '@testing-library/react';
import NameGameImage from '.';

describe('NameGameImage component', () => {
  test('renders an image with correct URL', () => {
    const imageUrl = 'name-game.svg';
    render(<NameGameImage src={imageUrl} alt="Test Image" />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', imageUrl);
    expect(image).toHaveAttribute('alt', 'Test Image');
  });
});
