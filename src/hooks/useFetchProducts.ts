import { useState, useEffect } from 'react';
import { Product } from '../types';

export const useFetchProducts = (id?: string) => {
  const [data, setData] = useState<Product | Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const url = id
      ? `https://fakestoreapi.com/products/${id}`
      : 'https://fakestoreapi.com/products';

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Daten konnten nicht geladen werden.');
        }

        const result = await response.json();

        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('Ein unbekannter Fehler ist aufgetreten.');
          }
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { data, loading, error };
};
