import { StyleSheet } from 'react-native';
import colors from '../../utils/colors.ts';

const { WHITE_COLOR, LIGHT_GRAY_COLOR, YELLOW_COLOR, TRANSPARENT_COLOR } =
  colors;

const styles = StyleSheet.create({
  artist: {
    color: WHITE_COLOR,
    fontWeight: 'bold',
  },
  blurView: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  container: {
    alignItems: 'center',
    backgroundColor: TRANSPARENT_COLOR,
    bottom: 0,
    flexDirection: 'column',
    height: 90,
    justifyContent: 'flex-end',
    left: 0,
    paddingHorizontal: 0,
    position: 'absolute',
    right: 0,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 16,
    width: '100%',
  },
  image: {
    borderRadius: 5,
    height: 40,
    marginRight: 10,
    width: 40,
  },
  mediaPlayerWrapper: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  playButton: {
    alignItems: 'center',
    backgroundColor: YELLOW_COLOR,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  playButtonText: {
    color: LIGHT_GRAY_COLOR,
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressBar: {
    backgroundColor: YELLOW_COLOR,
    height: 4,
    width: '100%',
  },
  progressBarContainer: {
    backgroundColor: LIGHT_GRAY_COLOR,
    height: 4,
    marginTop: -4,
    overflow: 'hidden',
    width: '100%',
  },
  songInfo: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default styles;
