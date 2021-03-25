import * as React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import ChartPage from '../containers/screens/webView';
import Home from '../containers/screens/home';

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
      </Stack.Navigator>
    </>
  );
};

export default MainNavigator;
