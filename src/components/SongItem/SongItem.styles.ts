// SongItem.styles.ts
import { StyleSheet } from 'react-native';
import colors from '../../styles/Colors.ts';

const SPEAKER_WIDTH = 50;

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(90, 90, 90, 0.8)',
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
  },
  selectedItem: {
    backgroundColor: colors.darkGray,
    borderColor: colors.subtleYellow,
    borderWidth: 1,
  },
  image: {
    borderRadius: 5,
    height: 50,
    width: 50,
  },
  listItemText: {
    flex: 1,
    marginLeft: 15,
  },
  listItemTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItemArtist: {
    color: colors.white,
    fontSize: 14,
  },
  listItemAlbum: {
    color: colors.white,
    fontSize: 12,
  },
  speakerContainer: {
    alignItems: 'center',
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    width: SPEAKER_WIDTH,
  },
  speakerIcon: {
    color: colors.white,
    fontSize: 20,
  },
  heartIcon: {
    fontSize: 24,
  },
});

export default styles;
