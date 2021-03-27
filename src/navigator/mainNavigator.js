import * as React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import ChartPage from '../containers/screens/webView';
import Home from '../containers/screens/home';
import Search from '../containers/screens/search';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chart" component={ChartPage} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </>
  );
};

export default MainNavigator;
