import { type ReactNode } from 'react';

interface Song {
  collectionName?: ReactNode; // for 'album'
  artworkUrl100?: string; // for 'albumArt'
  trackId: string; // for 'id'
  playing?: boolean;
  trackName: string; // for 'title'
  artistName?: string; // for 'artist'
  previewUrl: string;
  trackTimeMillis?: number;
}

export default Song;
