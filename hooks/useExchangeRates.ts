import { useState, useEffect } from 'react';

export function useExchangeRates() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRates() {
      try {
        // Replace with your preferred exchange rate API
        const response = await fetch('YOUR_EXCHANGE_RATE_API_ENDPOINT');
        const data = await response.json();
        setRates(data.rates);
      } catch (err) {
        setError('Failed to fetch exchange rates');
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, []);

  return { rates, loading, error };
}