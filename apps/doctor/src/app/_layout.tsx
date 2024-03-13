import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Color } from '@youwell/util-helpers';
import { Slot } from 'expo-router';

export default function _RootLayout() {
    return (
        <View style={styles.container}>
            <StatusBar style={Color.statusBarStyle('#FFFFFF')} />
            <Slot />
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
