import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Text,
  FlatList,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { getSymbols } from '../../api/searchSymbol';
import { colors } from '../../assets/colors';
import { logout } from '../../redux/authSlice';
import { removeValue } from '../../utils/asyncStorage';
import { USER_KEY } from '../../utils/constants';

const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const onLogout = async () => {
    await removeValue(USER_KEY);
    dispatch(logout());
  };
  const [symbols, setSymbols] = useState([]);
  let timer;
  const fetchSymbols = (query) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      let data = await getSymbols(query);
      setSymbols(data);
    }, 1500);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={{ backgroundColor: colors.grey1, width: '100%' }}
        onChangeText={fetchSymbols}
      />
      <FlatList
        data={symbols}
        style={{height:400}}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => {
          console.log(item);
          return (
            <Text>
              {item['1. symbol']} :: {item['2. name']}
            </Text>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Search;
