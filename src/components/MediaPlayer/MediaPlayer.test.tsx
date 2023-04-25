import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AppState } from 'react-native';
import MediaPlayer from './MediaPlayer.tsx';

const appStateSubscriptionMock = {
  remove: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('expo-av', () => {
  const InterruptionModeIOS = {
    MixWithOthers: 'InterruptionModeIOS.MixWithOthers',
  };
  const InterruptionModeAndroid = {
    DuckOthers: 'InterruptionModeAndroid.DuckOthers',
  };
  const unloadAsyncMock = jest.fn(); // Move the declaration inside the mock implementation
  const Audio = {
    setAudioModeAsync: jest.fn(
      async () =>
        await Promise.resolve({
          unloadAsync: unloadAsyncMock,
        })
    ),
  };
  return { Audio, InterruptionModeIOS, InterruptionModeAndroid };
});

jest.mock('expo-blur', () => ({
  BlurView: 'BlurView',
}));

describe('MediaPlayer', () => {
  const song = {
    id: 1,
    title: 'Test Song',
    artist: 'Test Artist',
  };

  test('renders correctly', () => {
    const { getByText } = render(
      <MediaPlayer
        currentSong={song}
        isPlaying={false}
        setIsPlaying={() => {}}
        setIsLoading={() => {}}
        setSoundObject={() => {}}
        handlePlayPause={() => {}}
      />
    );
    expect(getByText(song.title)).toBeTruthy();
    expect(getByText(song.artist)).toBeTruthy();
  });

  test('hides media player when currentSong prop is null', () => {
    const { queryByTestId } = render(
      <MediaPlayer
        currentSong={null}
        isPlaying={false}
        setIsPlaying={() => {}}
        setIsLoading={() => {}}
        setSoundObject={() => {}}
        handlePlayPause={() => {}}
      />
    );
    expect(queryByTestId('media-player')).toBeFalsy();
  });

  it('toggles play/pause when the button is pressed', async () => {
    const handlePlayPause = jest.fn();
    const { getByTestId } = render(
      <MediaPlayer
        currentSong={song}
        isPlaying={false}
        setIsPlaying={() => {}}
        setIsLoading={() => {}}
        setSoundObject={() => {}}
        handlePlayPause={handlePlayPause}
      />
    );

    const playPauseButton = getByTestId('play-pause-button');

    fireEvent.press(playPauseButton);

    await waitFor(() => {
      expect(handlePlayPause).toHaveBeenCalled();
    });
  });
});
