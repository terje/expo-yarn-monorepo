import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import index from 'util-helpers';

export default function App() {
    console.log('index', index());
    return (
        <View style={styles.container}>
            <Text>This is the doctor app</Text>
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
