import { useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading ] = useState(false);

  const handleFind = () => {
    setResults([]);
    setLoading(true);
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php';
    fetch(`${url}?i=${keyword}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Virhe fetch-haussa:", response.status);
      }
      return response.json();
    })
    .then(data => setResults(data.meals))
    .catch(e => console.error("Virhe:", e))
    .finally(() => setLoading(false));
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder='enter keyword' value={keyword} onChangeText={text => setKeyword(text)} />
      <Button title='FIND' onPress={handleFind} />
      {loading && <ActivityIndicator />}
      <FlatList 
        data={results}
        ItemSeparatorComponent={<View style={styles.separator} />}
        renderItem={({ item }) => (
          <>
            <Text style={styles.title}>{item.strMeal}</Text>
            <Image 
              style={styles.img}
              source={{
                uri: item.strMealThumb }} />
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
    marginTop: 5,
    marginBottom: 10,
    width: '75%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 20
  },
  img: {
    width: 80,
    height: 80
  }
});
