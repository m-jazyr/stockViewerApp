import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { getSymbols } from '../../api/searchSymbol';
import { colors } from '../../assets/colors';
import SymbolItem from '../../components/symbolItem.js';

const Search = ({ navigation, route }) => {
  const [symbols, setSymbols] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  let stock;
  if (route.params) {
    stock = route.params.stock;
  }
  let timer;
  useEffect(() => {
    if (stock) {
      fetchSymbols(stock);
    }
  }, []);
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
        inputContainerStyle={styles.searchBox}
        onChangeText={fetchSymbols}
        loadingProps={{ color: colors.primary }}
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
    backgroundColor: colors.white,
    borderBottomColor: colors.white,
  },
});

export default Search;
