import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Board from './src/components/molecules/Board';
import {HEADER_FONT} from './src/utils/typography';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.header}>Tic Tac Toe!</Text>
          <Board />
        </View>
      </SafeAreaView>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    ...HEADER_FONT,
    color: 'lightgrey',
    fontWeight: 'bold',
    marginTop: 32,
  },
});
