import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Button, TextInput } from 'react-native';
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
        <TouchableOpacity style={styles.headerIcon} onPress={() => {navigation.navigate("Add")}}>
          <Entypo name="new-message" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  });
  
  function renderItem({ item }){
    return <Text style={styles.listItem}>{item.title}</Text>;
  }
 
  return (
    <View style={styles.container}>
      <FlatList style={styles.list} data={notes} renderItem={renderItem} />
    </View>
  )
}

const Stack = createStackNavigator();

function addScreen({ navigation }){
  const [todoText, setTodoText] = useState("");
  
  return (
    <View style={styles.container}>
      <Text>Add Your Notes</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setTodoText(text)}
      />
      <Button title="Submit" onPress={() => navigation.goBack()} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const NotesStack = createStackNavigator();

function notesStackScreen(){
  return (
    <NotesStack.Navigator>
      <NotesStack.Screen name="Notes" component={notesScreen} options={{
        headerTitle: "Notes App",
        headerTitleStyle: styles.headerTitleStyle,
        headerStyle: styles.headerStyle,
      }} />
    </NotesStack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" headerMode="none" >
        <Stack.Screen name="Notes" component={notesStackScreen} options={{ headerShown: false, }} />
        <Stack.Screen name="Add" component={addScreen} />
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
  listItem: {
    height: 60,
    justifyContent: "center",
    fontSize: 30,
    borderBottomColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    marginBottom: 0,
  },
  list: {
    width: "100%",
  },
  headerIcon: {
    paddingRight: 10,
  },
  textInput: {
    backgroundColor: "white",
    width: "90%",
    borderColor: "black",
    padding: 10,
    marginTop: 10,
  }
});
 