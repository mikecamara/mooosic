/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MediaPlayer from './MediaPlayer.tsx';

describe('MediaPlayer', () => {
  it('renders the MediaPlayer with the current song and play button', () => {
    const { getByText } = render(<MediaPlayer />);

    expect(getByText('Song 1')).toBeTruthy();
    expect(getByText('Artist 1')).toBeTruthy();
    expect(getByText('▶')).toBeTruthy();
  });

  it('changes the current song when the play button is pressed', () => {
    const { getByText, rerender } = render(<MediaPlayer />);

    fireEvent.press(getByText('▶'));
    rerender(<MediaPlayer />);

    expect(getByText('Song 2')).toBeTruthy();
    expect(getByText('Artist 2')).toBeTruthy();
  });
});
