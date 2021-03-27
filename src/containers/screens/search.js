import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { getSymbols } from '../../api/searchSymbol';
import { colors } from '../../assets/colors';
import SymbolItem from '../../components/symbolItem.js';

const Search = ({ navigation }) => {
  const [symbols, setSymbols] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  let timer;
  const fetchSymbols = (text) => {
    if (text === '') {
      setSymbols([]);
      return;
    }
    setQuery(text);
    setLoading(true);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      let data = await getSymbols(text);
      setSymbols(data);
      setLoading(false);
    }, 1500);
  };
  return (
    <View style={styles.container}>
      <SearchBar
        lightTheme
        containerStyle={styles.searchBox}
        onChangeText={fetchSymbols}
        showLoading={loading}
        value={query}
      />
      <FlatList
        data={symbols}
        style={styles.searchBox}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <SymbolItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  searchBox: {
    width: '100%',
  },
});

export default Search;
