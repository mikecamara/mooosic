/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MediaPlayer from '../MediaPlayer.tsx';

describe('MediaPlayer', () => {
  it('renders the MediaPlayer with the current song and play button', () => {
    const { getByText } = render(<MediaPlayer />);

    expect(getByText('Song 1')).toBeTruthy();
    expect(getByText('Artist 1')).toBeTruthy();
    expect(getByText('▶')).toBeTruthy();
  });

  it('calls the handlePlayPause when the play button is pressed', () => {
    const handlePlayPause = jest.fn();
    const { getByText } = render(<MediaPlayer onPlayPause={handlePlayPause} />);

    fireEvent.press(getByText('▶'));
    expect(handlePlayPause).toHaveBeenCalledTimes(1);
  });
});
