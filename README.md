[![CICD](https://github.com/mikecamara/mooosic/actions/workflows/ci_cd.yml/badge.svg)](https://github.com/mikecamara/mooosic/actions/workflows/ci_cd.yml)

# Mooosic 🐄🎵

A simple and cowsome music player app that allows users to search for their favorite artists using the iTunes Search API. Built with React Native and Expo.

![Mooosic App Demo](app-demo.gif)

## Features

- Search for artists by name
- Displays song title, artist, album, and album art
- Media player with play/pause functionality
- Portrait mode layout
- Built using React Native and Expo

## Prerequisites

- Node.js v12 or higher
- npm or yarn
- Expo CLI

## Installation and Setup

1. Clone this repository:

```
git clone https://github.com/mikecamara/mooosic.git
cd mooosic
```

2. Install dependencies:

```
npm install
```

or

```
yarn
```

3. Start the development server:

```
expo start
```

4. Follow the instructions in the Expo CLI to run the app on your device or emulator.

## Usage

1. Enter an artist's name in the search bar and tap the search button.
2. Browse the list of songs returned by the search.
3. Tap a song to start playing it. The media player will appear at the bottom of the screen.
4. Use the play/pause button to control playback.

## Testing

To run the unit, integration, and end-to-end tests

```
npm test
```

## Deployment

To build and deploy the app to the app store, follow the [Expo documentation](https://docs.expo.dev/distribution/introduction/) on building standalone apps.

## Known Issues and Limitations

- When a song ends, the app does not automatically play the next song.
- No advanced media controls (seeking, skipping, or volume control) are implemented.

## Contributing

Please feel free to submit issues or pull requests with any bug fixes, improvements, or new features. Adhere to the project's coding standards and include tests for any new functionality.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Special thanks to the iTunes Search API for providing the music data.
- Inspired by the love for cows and music 🐄🎵.
