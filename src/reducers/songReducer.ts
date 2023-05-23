import { type Audio } from 'expo-av';
import type Song from '../types/Song';
import type { SongState } from '../interfaces/SongState';

const initialSongState: SongState = {
  songs: [],
  currentSong: null,
  isPlaying: false,
  isLoading: false,
  soundObject: null,
  currentPage: 1,
  searchQuery: '',
  sound: null,
  isMediaPlayerVisible: false,
  progress: 0,
};

export type Action =
  | { type: 'setSongs'; payload: Song[] }
  | {
      type: 'setCurrentSong';
      payload: Song | null;
      isMediaPlayerVisible?: boolean;
    }
  | { type: 'setIsPlaying'; payload: boolean }
  | { type: 'setIsLoading'; payload: boolean }
  | { type: 'setSoundObject'; payload: Audio.SoundObject | null }
  | { type: 'setCurrentPage'; payload: number }
  | { type: 'setSearchQuery'; payload: string }
  | { type: 'setSound'; payload: Audio.Sound | null }
  | { type: 'setProgress'; payload: number }
  | { type: 'pause' }
  | { type: 'play' };

const songReducer = (state: SongState, action: Action): SongState => {
  switch (action.type) {
    case 'setSongs':
      return { ...state, songs: action.payload };
    case 'setCurrentSong':
      if (state.sound !== null) {
        void state.sound.pauseAsync();
      }
      return {
        ...state,
        currentSong: action.payload,
        isPlaying: true,
        isMediaPlayerVisible: action.isMediaPlayerVisible ?? true,
        progress: 0,
      };
    case 'setIsPlaying':
      return {
        ...state,
        isPlaying: action.payload,
        isMediaPlayerVisible: true,
      };
    case 'setIsLoading':
      return { ...state, isLoading: action.payload };
    case 'setSoundObject':
      if (state.soundObject !== null) {
        void state.soundObject.sound.unloadAsync();
      }
      return { ...state, soundObject: action.payload };
    case 'setCurrentPage':
      return { ...state, currentPage: action.payload };
    case 'setSearchQuery':
      return { ...state, searchQuery: action.payload };
    case 'setSound':
      return { ...state, sound: action.payload };
    case 'setProgress':
      return { ...state, progress: action.payload };
    case 'pause':
      if (state.sound !== null) {
        void state.sound.pauseAsync();
      }
      return { ...state, isPlaying: false };
    case 'play':
      return { ...state, isPlaying: true };
    default:
      throw new Error(`Unhandled action type: ${(action as any).type}`);
  }
};

export { initialSongState, songReducer };
