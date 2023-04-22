interface Song {
  album?: ReactNode;
  albumArt?: string | undefined;
  id: string;
  playing?: boolean;
  title: string;
  artist?: string;
}

export default Song;
