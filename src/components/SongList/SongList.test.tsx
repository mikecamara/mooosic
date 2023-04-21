/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import '@testing-library/jest-dom/extend-expect';
import SongList from './SongList.tsx';

const mockSongs = [
  { id: '1', title: 'Song 1', artist: 'Artist 1' },
  { id: '2', title: 'Song 2', artist: 'Artist 2' },
  { id: '3', title: 'Song 3', artist: 'Artist 3' },
];

describe('SongList', () => {
  test('renders correctly', () => {
    render(
      <SongList
        songs={mockSongs}
        onSongPress={() => {
          console.log('Song pressed');
        }}
      />
    );
    expect(screen.getByText('Song 1 - Artist 1')).toBeTruthy();
    expect(screen.getByText('Song 2 - Artist 2')).toBeTruthy();
    expect(screen.getByText('Song 3 - Artist 3')).toBeTruthy();
  });
});
