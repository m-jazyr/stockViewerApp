import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../assets/colors';

const PrimaryButton = ({ title, action, isNegative }) => {
  return (
    <TouchableOpacity
      style={[styles.container, isNegative && styles.negativeContainer]}
      onPress={action}>
      <Text style={[styles.title, isNegative && styles.negativeText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    marginVertical: 4,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  negativeContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  title: {
    fontSize: 16,
    padding: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  negativeText: {
    color: colors.primary,
    fontWeight: 'normal',
  },
});

export default PrimaryButton;
