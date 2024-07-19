import { useEffect, useState } from 'react';

interface ErrorType {
  name?: string,
  message?: string,
};

const useFetchGet = (url: string) => {
  const [[response, error], setResult] = useState<(unknown | null)[]>([null, null]);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      let response: unknown;
      try {
        const ret = await fetch(url, {
          signal: controller.signal,
        });
        response = await ret.json();
      } catch (e) {
        const error = e as ErrorType;
        if (error.name !== 'AbortError') {
          setResult([null, error.message]);
        }
        return;
      }

      setResult([response, null ]);
    })();

    return () => {
      controller.abort();
    };
  }, [url]);

  return [response, error];
}

export default useFetchGet;
