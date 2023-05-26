import { useQuery } from 'react-query';
import type Song from '../types/Song';
import parseSong from '../utils/helpers.ts';
import type ResponseData from '../types/ResponseData.ts';
import type ResponseSearchData from '../types/ResponseSearchData.ts';

export async function fetchSongsFromAPI(
  term: string,
  limit: number = 10
): Promise<Song[]> {
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        term
      )}&entity=song&limit=${limit}`
    );
    const data: ResponseSearchData = await response.json();
    const songs: Song[] = data.results.map((result) => ({
      trackId: result.trackId.toString(),
      trackName: result.trackName,
      artistName: result.artistName,
      previewUrl: result.previewUrl,
      trackTimeMillis: result.trackTimeMillis,
      collectionName: result.collectionName,
      artworkUrl100: result.artworkUrl100,
    }));

    return songs;
  } catch (error) {
    console.error('Error fetching songs from API:', error);
    return [];
  }
}

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
