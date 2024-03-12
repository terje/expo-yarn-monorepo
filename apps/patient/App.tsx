import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Color } from '@youwell/util-helpers';

export default function App() {
    return (
        <View style={styles.container}>
            <Text>This is the patient app</Text>
            <StatusBar style={Color.statusBarStyle('#FFAA00')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFAA00',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
