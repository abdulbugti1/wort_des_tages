import React, {useState, useEffect} from 'react';
const {parse} = require('rss-to-json');

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {DataComponent} from './components/DataComponent';
import styles from './components/styles.js';

type MainTitleProps = {
  text: string;
};

function MainTitle({text}: MainTitleProps) {
  return (
    <View>
      <Text style={styles.MainTitle}>{text}</Text>
    </View>
  );
}

function App(): JSX.Element {
  console.log('this');
  console.log('App');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // Get the data
  const [data, setData] = useState([]);

  useEffect(() => {
    parse('https://feeds.feedblitz.com/german-word-of-the-day&x=1').then(
      response => setData(response),
    );
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <MainTitle text="Wort Des Tages" />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <DataComponent json={data} requestedData="title" />

          <DataComponent json={data} requestedData="Part of speech" />
          <DataComponent json={data} requestedData="Example sentence" />
          <DataComponent json={data} requestedData="Sentence meaning" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
