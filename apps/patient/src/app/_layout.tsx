import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Slot } from 'expo-router';
import { Color } from '@youwell/util-helpers';

export default function _RootLayout() {
    return (
        <View style={styles.container}>
            <StatusBar style={Color.statusBarStyle('#FFAA00')} />
            <Slot />
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
