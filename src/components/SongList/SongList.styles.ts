import { StyleSheet } from 'react-native';

const colors = {
  darkGray: '#2C2C2C',
  lightGray: '#4A4A4A',
  lighterGray: '#5A5A5A',
  white: '#fff',
  subtleYellow: '#EFEA9A',
  transparent: 'transparent',
};

const SPEAKER_WIDTH = 50;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 50, // Adjust this as needed
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 5,
    height: 50,
    width: 50,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  // eslint-disable-next-line react-native/no-color-literals
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
  listItemAlbum: {
    color: colors.white,
    fontSize: 12,
  },
  listItemArtist: {
    color: colors.white,
    fontSize: 14,
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
  noResults: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedItem: {
    backgroundColor: colors.darkGray,
    borderColor: colors.subtleYellow,
    borderWidth: 1,
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
});

export default styles;
