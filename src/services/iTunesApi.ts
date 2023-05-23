import type Song from '../types/Song';
import parseSong from '../utils/helpers.ts';

/**
 * Utility function to make fetch request and return parsed songs.
 *
 * @param {string} url - The URL for the API request.
 * @returns {Promise<Song[]>} - A promise resolving to an array of songs.
 */
export const fetchSongsFromAPI = async (url: string): Promise<Song[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Error fetching data from iTunes API: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.results.map(parseSong);
};

export const fetchDefaultSongs = async (page: number): Promise<Song[]> => {
  const defaultQuery = 'red+hot';
  const url = `https://itunes.apple.com/search?term=${defaultQuery}&media=music&entity=song&limit=25&offset=${
    (page - 1) * 25
  }`;
  return await fetchSongsFromAPI(url);
};

export const fetchSongs = async (query: string): Promise<Song[]> => {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    query
  )}&media=music&entity=song&attribute=artistTerm&limit=25`;
  return await fetchSongsFromAPI(url);
};

export const loadMoreSongsService = async (
  currentPage: number,
  searchQuery: string,
  songsLength: number
): Promise<Song[]> => {
  if (searchQuery.trim() === '') {
    return await fetchDefaultSongs(currentPage + 1);
  }

  const query = '&media=music&entity=song&attribute=artistTerm&limit=25&offset';
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    searchQuery
  )}${query}=${songsLength}`;

  const fetchedSongs = await fetchSongsFromAPI(url);

  if (fetchedSongs.length === 0) {
    throw new Error('No more songs to load');
  }

  return fetchedSongs;
};
