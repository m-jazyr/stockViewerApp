import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../assets/colors';

const SymbolItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Chart', {
          symbol: item['1. symbol'],
        })
      }>
      <Text style={styles.symbol}>{item['1. symbol']}</Text>
      <Text style={styles.name}>{item['2. name']}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 6,
    height: 60,
    marginHorizontal: '2%',
  },
  negativeContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  symbol: {
    fontSize: 15,
    maxWidth: '20%',
  },
  name: {
    color: colors.primary,
    fontSize: 13,
    maxWidth: '75%',
  },
});

export default SymbolItem;
