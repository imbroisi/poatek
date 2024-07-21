import { renderHook, act, waitFor } from '@testing-library/react';
import useFetchGet from './useFetchGet';

describe('useFetchGet', () => {
  function waitForNextUpdate() {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    });
  }

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should fetch data successfully', async () => {
    const responseData = { name: 'John Doe', age: 30 };
    const url = 'https://example.com/api/data';

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseData),
    });

    const { result } = renderHook(() => useFetchGet(url));
    await waitFor(() => {
      expect(result.current).toEqual([responseData, null]);
    });
  });

  test('should handle fetch error', async () => {
    const errorMessage = 'Failed to fetch data';
    const url = 'https://example.com/api/data';

    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useFetchGet(url));

    await waitFor(() => {
      expect(result.current).toEqual([null, null]);
    });

    await waitForNextUpdate();

    expect(result.current).toEqual([null, errorMessage]);
    expect(global.fetch).toHaveBeenCalledWith(url, { signal: expect.any(AbortSignal) });
  });

  test('should handle abort error', async () => {
    const url = 'https://example.com/api/data';

    (global.fetch as jest.Mock).mockRejectedValueOnce({ name: 'AbortError' });

    const { result } = renderHook(() => useFetchGet(url));

    expect(result.current).toEqual([null, null]);

    await waitForNextUpdate();

    expect(result.current).toEqual([null, null]);
    expect(global.fetch).toHaveBeenCalledWith(url, { signal: expect.any(AbortSignal) });
  });
});
