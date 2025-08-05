import { useQuery } from '@tanstack/react-query';
import api from '../api/api';


export const useFetchMyShortUrls = ({ token, onError }) => {
  return useQuery({
    queryKey: ['myShortUrls'],
    queryFn: async () => {
      const { data } = await api.get('/api/urls/myurls', {
        headers: { Authorization: 'Bearer ' + token },
      });
      return data;
    },
    enabled: !!token,
    onError,
  });
};

export const useFetchTotalClicks = ({ token, onError }) => {
  return useQuery({
    queryKey: ['totalClicks'],
    queryFn: async () => {
      const { data } = await api.get('/api/urls/totalClicks', {
        headers: { Authorization: 'Bearer ' + token },
      });
      // Transform object to array
      const transformed = Object.entries(data).map(([date, count]) => ({
        date,
        count,
      }));
      return transformed;
    },
    enabled: !!token,
    onError,
  });
};

