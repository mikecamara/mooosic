// import { StyleSheet } from 'react-native';
// import colors from '../../utils/colors.ts';

// const { GRAY_COLOR } = colors;

// const styles = StyleSheet.create({
//   centered: {
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//   },
//   image: {
//     height: 50,
//     width: 50,
//   },
//   listItem: {
//     alignItems: 'center',
//     borderBottomColor: GRAY_COLOR,
//     borderBottomWidth: 1,
//     flexDirection: 'row',
//     padding: 10,
//   },
//   listItemAlbum: {
//     fontSize: 12,
//   },
//   listItemArtist: {
//     fontSize: 14,
//   },
//   listItemText: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   listItemTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   noResults: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   selectedItem: {
//     backgroundColor: GRAY_COLOR,
//   },
//   speakerContainer: {
//     borderBottomWidth: 0,
//   },
//   speakerIcon: {
//     fontSize: 20,
//     marginLeft: 10,
//   },
// });

// export default styles;
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
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.darkGray,
    flex: 1,
  },
  image: {
    borderRadius: 5,
    height: 50,
    width: 50,
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: colors.lighterGray,
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
