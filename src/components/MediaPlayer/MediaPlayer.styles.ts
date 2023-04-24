import { StyleSheet } from 'react-native';
import colors from '../../utils/colors.ts';

const { ORANGE_COLOR, GRAY_COLOR, LIGHT_GRAY_COLOR, GREEN_COLOR } = colors;

const styles = StyleSheet.create({
  artist: {
    color: ORANGE_COLOR,
  },
  blurView: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: -10,
  },
  container: {
    alignItems: 'center',
    borderColor: GRAY_COLOR,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    left: 0,
    paddingBottom: 30,
    paddingHorizontal: 16,
    position: 'absolute',
    right: 0,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  mediaPlayerWrapper: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  playButton: {
    alignItems: 'center',
    backgroundColor: GREEN_COLOR,
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
  songInfo: {
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default styles;
