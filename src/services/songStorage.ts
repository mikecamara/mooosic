import type Song from '../types/Song';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLikedSong = async (song: Song) => {
  try {
    const likedSongs = await getLikedSongs();
    likedSongs.push(song);
    const stringifiedSongs = JSON.stringify(likedSongs);
    await AsyncStorage.setItem('@liked_songs', stringifiedSongs);
  } catch (error) {
    console.error('Error saving liked song:', error);
  }
};

export const removeLikedSong = async (trackId: string) => {
  try {
    let likedSongs = await getLikedSongs();
    likedSongs = likedSongs.filter((song) => song.trackId !== trackId);
    const stringifiedSongs = JSON.stringify(likedSongs);
    await AsyncStorage.setItem('@liked_songs', stringifiedSongs);
  } catch (error) {
    console.error('Error removing liked song:', error);
  }
};

export const getLikedSongs = async (): Promise<Song[]> => {
  try {
    const likedSongsJson = await AsyncStorage.getItem('@liked_songs');
    return likedSongsJson != null ? JSON.parse(likedSongsJson) : [];
  } catch (error) {
    console.error('Error getting liked songs:', error);
    return [];
  }
};
