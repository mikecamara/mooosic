// import { StyleSheet } from 'react-native';

// const colors = {
//   white: '#fff',
//   lightGrey: '#f2f2f2',
//   red: '#ff0000',
// };

// const AppStyles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     backgroundColor: colors.lightGrey,
//     flex: 1,
//     justifyContent: 'space-between',
//     paddingTop: 50,
//   },
//   mainContent: {
//     flex: 1,
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   text: {
//     color: colors.red,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default AppStyles;

import { StyleSheet } from 'react-native';

const colors = {
  darkGray: '#2C2C2C',
  lightGray: '#4A4A4A',
  white: '#fff',
};

const AppStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 50,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppStyles;
