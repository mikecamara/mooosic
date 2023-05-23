import type Song from '../types/Song';

/**
 * Parses a raw song object returned from the iTunes API into a Song type.
 *
 * @param {any} result - The raw song object.
 * @returns {Song} - The parsed song object.
 */
export default function parseSong(result: any): Song {
  return {
    id: result.trackId.toString(),
    title: result.trackName,
    artist: result.artistName,
    album: result.collectionName,
    albumArt: result.artworkUrl100,
    playing: false,
    previewUrl: result.previewUrl,
    trackTimeMillis: result.trackTimeMillis,
  };
}
