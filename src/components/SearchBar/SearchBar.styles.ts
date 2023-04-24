import { StyleSheet } from 'react-native';
import colors from '../../utils/colors.ts';

const { GRAY_COLOR, DARK_GRAY_COLOR } = colors;

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_GRAY_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    backgroundColor: GRAY_COLOR,
    borderColor: GRAY_COLOR,
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    paddingLeft: 8,
  },
});

export default styles;
