import { useQuery } from 'react-query';
import type ResponseData from '../types/ResponseData.ts';

export async function fetchDefaultSongs(page: number): Promise<ResponseData> {
  const defaultQuery = 'red+hot';
  const url = `https://itunes.apple.com/search?term=${defaultQuery}&media=music&entity=song&limit=25&offset=${
    (page - 1) * 25
  }`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchSongs(query: string): Promise<ResponseData> {
  if (query === '') {
    return fetchDefaultSongs(1);
  }
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    query
  )}&media=music&entity=song&attribute=artistTerm&limit=25`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export const useDefaultSongs = (page: number) => {
  return useQuery(['songs', page], () => fetchDefaultSongs(page), {
    keepPreviousData: true, // for pagination to work correctly
  });
};

export const useSongs = (query: string) => {
  return useQuery(['songs', query], () => fetchSongs(query), {
    enabled: !!query, // only runs when the query isn't empty
  });
};
