import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
<script src="http://localhost:8097"></script>
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Openn up App.tsx to staddrt working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
