import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Color } from '@youwell/util-helpers';

export default function App() {
    return (
        <View style={styles.container}>
            <Text>This is the doctor app</Text>
            <StatusBar style={Color.statusBarStyle('#FFFFFF')} />
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
