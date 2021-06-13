import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from "@expo/vector-icons";

function notesScreen({ navigation }) {
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Entypo name="new-message" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  });

  return <View style={styles.container}></View>
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
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    height: 80,
    backgroundColor: 'pink',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 30,
  },
});
 