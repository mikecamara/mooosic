import React, {
  useReducer,
  createContext,
  type Dispatch,
  type ReactNode,
  useMemo,
} from 'react';
import { songReducer, initialSongState } from '../reducers/songReducer.ts';
import type { SongState } from '../interfaces/SongState';
import type { Action } from '../reducers/songReducer';

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

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
}

export { SongContext, SongProvider };
