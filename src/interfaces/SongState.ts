import { type Audio } from 'expo-av';
import type Song from '../types/Song';

export interface SongState {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  isLoading: boolean;
  soundObject: Audio.SoundObject | null;
  currentPage: number;
  searchQuery: string;
  sound: Audio.Sound | null;
  isMediaPlayerVisible: boolean;
  progress: number;
  likedSongs: Map<string, Song>;
}
