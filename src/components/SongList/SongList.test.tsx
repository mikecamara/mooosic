import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-dom/extend-expect';
import SongList from './SongList.tsx';
import { SongProvider } from '../../contexts/SongContext.tsx';

const mockSongs = [
  {
    id: '1',
    title: 'Song 1',
    artist: 'Artist 1',
    album: 'Album 1',
    albumArt: 'https://example.com/song1.png',
  },
  {
    id: '2',
    title: 'Song 2',
    artist: 'Artist 2',
    album: 'Album 2',
    albumArt: 'https://example.com/song2.png',
  },
  {
    id: '3',
    title: 'Song 3',
    artist: 'Artist 3',
    album: 'Album 3',
    albumArt: 'https://example.com/song3.png',
  },
];

describe('SongList', () => {
  test('renders correctly', () => {
    render(
      <SongProvider>
        <SongList />
      </SongProvider>
    );
    expect(screen.getByTestId('song-1')).toBeTruthy();
    expect(screen.getByTestId('song-2')).toBeTruthy();
    expect(screen.getByTestId('song-3')).toBeTruthy();
  });

  test('calls setCurrentSong and setIsPlaying', () => {
    const setCurrentSongMock = jest.fn();
    const setIsPlayingMock = jest.fn();
    render(
      <SongProvider>
        <SongList />
      </SongProvider>
    );
    const song = mockSongs[0];
    const listItem = screen.getByTestId(`song-${song.id}`);

    fireEvent.press(listItem);

    expect(setCurrentSongMock).toHaveBeenCalledWith(song);
    expect(setIsPlayingMock).toHaveBeenCalledWith(true);
  });
});
