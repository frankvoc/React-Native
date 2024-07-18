import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
<script src="http://localhost:8097"></script>
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on franks app!</Text>
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
