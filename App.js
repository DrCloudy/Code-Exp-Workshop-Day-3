import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('notes.db');
const SAMPLE_NOTES = [
  { title: "one", id: "0", done: false },
  { title: "two", id: "1", done: false },
  { title: "three", id: "2", done: false },
  { title: "four", id: "3", done: false },
];

function notesScreen({ navigation }) {
  
  const [ notes, setNotes ] = useState(SAMPLE_NOTES);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Entypo name="new-message" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  });
  
  function renderItem({ item }){
    return <Text style={styles.itemStyle}>{item.title}</Text>;
  }
 
  return (
    <View style={styles.container}>
      <FlatList style={styles.listStyle} data={notes} renderItem={renderItem} />
    </View>
  )
}

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Notes" component={notesScreen} options = {{
          headerTitle: "Notes",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  headerStyle: {
    height: 80,
    backgroundColor: "pink",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 30,
  },
  itemStyle: {
    height: 60,
    justifyContent: "center",
    paddingLeft: 20,
    fontSize: 24,
     borderColor: 'pink',
    borderWidth: 1,
  },
  listStyle: {
    width: "100%",
  },
});
 