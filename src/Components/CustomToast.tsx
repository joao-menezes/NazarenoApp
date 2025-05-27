import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast, { BaseToastProps } from 'react-native-toast-message';

const toastConfig = {
    success: ({ text1, text2 }: BaseToastProps) => (
        <View style={styles.successToast}>
            <Text style={styles.toastText1}>{text1}</Text>
            {text2 && <Text style={styles.toastText2}>{text2}</Text>}
        </View>
    ),
    info: ({ text1, text2 }: BaseToastProps) => (
        <View style={styles.infoToast}>
            <Text style={styles.toastText1}>{text1}</Text>
            {text2 && <Text style={styles.toastText2}>{text2}</Text>}
        </View>
    ),
    error: ({ text1, text2 }: BaseToastProps) => (
        <View style={styles.errorToast}>
            <Text style={styles.toastText1}>{text1}</Text>
            {text2 && <Text style={styles.toastText2}>{text2}</Text>}
        </View>
    ),
};

const CustomToast = () => {
    return (
        <Toast
            config={toastConfig}
            topOffset={60}
            visibilityTime={3000}
            autoHide={true}
            position={"top"}
        />
    );
};

const styles = StyleSheet.create({
    successToast: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 20,
        marginBottom: 20,
        width: '90%',
    },
    infoToast: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 20,
        marginBottom: 20,
        width: '90%',
    },
    errorToast: {
        backgroundColor: '#f32121',
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 20,
        marginBottom: 20,
        width: '90%',
    },
    toastText1: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    toastText2: {
        color: 'white',
        fontSize: 14,
        marginTop: 4,
    },
});
export default CustomToast;