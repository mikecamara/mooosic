import { StyleSheet } from 'react-native';
import colors from '../../utils/colors.ts';

const { WHITE_COLOR, GRAY_COLOR, LIGHT_GRAY_COLOR, YELLOW_COLOR } = colors;

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
    top: -10,
  },
  container: {
    alignItems: 'center',
    borderColor: GRAY_COLOR,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: 'row',
    height: 90,
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
  songInfo: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default styles;
