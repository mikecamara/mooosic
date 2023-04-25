# Simple Music Player App Requirements

## Introduction
This document outlines the requirements for a simple music player app that allows users to search for an artist by name using the iTunes Search API. The app will display search results, including song title, artist, album, and album art. Users can play song previews and control playback through a media player.

## Functional Requirements
### 2.1 Search for Artist

* The app must provide a search bar where users can search for an artist by name.
* The app must use the iTunes Search API to fetch search results.

### 2.2 Display Search Results

* The app must display a maximum of 25 search results at once.
* Each search result must display the song title, artist, album, and album art.

### 2.3 Media Player

* The app must display a media player at the bottom of the screen once a song is selected for the first time.
* The media player should have a play/pause button.
* The media player's background should blur the song list behind it.
* The media player should only be visible when a song is playing.
* When a song is selected for the first time, the app may play the song preview automatically.
* For subsequent song selections, the app must not play the song automatically.

### 2.4 Playback Controls

* When a song is selected and not playing, the app must display a play button.
* When a song is selected and playing, the app must display a pause button.
* When the play button is clicked, the song should start playing. If another song was playing, it should stop.
* When the pause button is clicked, the song should stop playing.
* The app must indicate which song is being played in the list of search results.
* The app must allow users to navigate away from the currently playing song without stopping playback.
* When a new search is performed, the app may leave any playing songs as is or stop the playing song.

### 2.5 User Interface

* The app layout must be fixed to portrait mode.
* The app must change the background color for the selected song and display a playing indication.
* The app must show the music player only when a song is selected.
* Technical Requirements
* The app must be built using React Native.
* The use of Expo is permitted.
* The UI can be adapted, but the main elements mentioned in the requirements must be present.
* The app will be evaluated based on code quality, implementation, project structure, readability, and documentation.
* Third-party libraries may be used, but their usage should be limited to showcase the developer's skills.
* The submission must include a README with details on requirements to build the app, as well as instructions to build and deploy the app.

## Clarifying Questions
### 4.1 Will the app support both Android and iOS platforms?
### 4.2 Is there a preference for using Expo's managed workflow or bare workflow?
### 4.3 Should the app support pagination or infinite scrolling for search results with more than 25 songs?
### 4.4 Is there a specific design, color scheme, or theme to follow for the app's user interface?
### 4.5 Should the app include any additional features, such as managing playlists, favoriting songs, or sharing song information?

