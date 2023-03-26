import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  json: any;
  requestedData: string;
}
export const DataComponent: React.FC<Props> = ({json, requestedData}) => {
  const [data, setData] = useState(null);

  const getParsedData = async ({json}) => {
    console.log('getParsedData', json);
    const data = {};
    data['title'] = json.items[0].title;
    const html = json?.items[0].description;
    const rows = html?.split('<tr>');

    if (rows) {
      for (let i = 1; i < rows.length; i++) {
        let str = rows[i];
        let key = str
          .substring(str.indexOf('>') + 1, str.lastIndexOf('</th>'))
          .replace(':', '');

        let value = str.substring(
          str.indexOf('3em">') + 5,
          str.lastIndexOf('</td>'),
        );
        data[key] = value;
      }
      return data;
    }
  };

  const handleGetData = async () => {
    const parsedData = await getParsedData({json});
    setData(parsedData);
  };

  if (!data) {
    handleGetData();
    return (
      <View>
        <Text>something went wrong</Text>
      </View>
    ); // or return a loading indicator while the data is being fetched
  }
  return (
    <View>
      {requestedData === 'title' ? (
        <Text style={styles.mainWord}>{data.title}</Text>
      ) : (
        <View style={{marginTop: 20}}>
          <Text style={styles.textKey}>{requestedData}</Text>
          <Text style={styles.textValue}>{data[requestedData]}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainWord: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  textValue: {
    paddingHorizontal: 24,
    fontSize: 18,
    fontWeight: '400',
  },
  textKey: {
    paddingHorizontal: 24,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
