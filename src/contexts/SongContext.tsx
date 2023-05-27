import React, {
  useReducer,
  createContext,
  type Dispatch,
  type ReactNode,
  useMemo,
  useEffect,
} from 'react';
import { songReducer, initialSongState } from '../reducers/songReducer.ts';
import type { SongState } from '../interfaces/SongState';
import type { Action } from '../reducers/songReducer';
import Song from '../types/Song.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SongContextProps {
  state: SongState;
  dispatch: Dispatch<Action>;
}

const SongContext = createContext<SongContextProps>({
  state: initialSongState,
  dispatch: () => null,
});

interface SongProviderProps {
  children: ReactNode;
}

function SongProvider({ children }: SongProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(songReducer, initialSongState);

  useEffect(() => {
    const loadLikedSongs = async () => {
      try {
        const storedLikedSongs = await AsyncStorage.getItem('@liked_songs');
        const likedSongsArray: Song[] =
          storedLikedSongs !== null ? JSON.parse(storedLikedSongs) : [];
        const likedSongsMap: Map<string, Song> = new Map(
          likedSongsArray.map((song) => [song.trackId, song])
        );
        dispatch({ type: 'loadLikedSongs', payload: likedSongsMap });
      } catch (error) {
        console.error('Error loading liked songs:', error);
      }
    };

    loadLikedSongs();
  }, []);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
}

export { SongContext, SongProvider };
