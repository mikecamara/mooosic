import { type ReactNode } from 'react';

interface Song {
  album?: ReactNode;
  albumArt?: string | undefined;
  id: string;
  playing?: boolean;
  title: string;
  artist?: string;
  previewUrl: string;
  trackTimeMillis?: number;
}

export default Song;
