import { StyleSheet } from 'react-native';
import colors from '../../utils/colors.ts';

const { GRAY_COLOR } = colors;

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  image: {
    height: 50,
    width: 50,
  },
  listItem: {
    alignItems: 'center',
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 10,
  },
  listItemAlbum: {
    fontSize: 12,
  },
  listItemArtist: {
    fontSize: 14,
  },
  listItemText: {
    flex: 1,
    marginLeft: 10,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noResults: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedItem: {
    backgroundColor: GRAY_COLOR,
  },
  speakerContainer: {
    borderBottomWidth: 0,
  },
  speakerIcon: {
    fontSize: 20,
    marginLeft: 10,
  },
});

export default styles;
