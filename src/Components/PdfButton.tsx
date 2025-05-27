import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ActivityIndicator } from 'react-native';

interface PdfButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    loading?: boolean;
    disabled?: boolean;
}

export const PdfButton: React.FC<PdfButtonProps> = ({
    onPress,
    loading = false,
    disabled = false
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.fab,
                (disabled || loading) && styles.disabledButton
            ]}
            onPress={onPress}
            activeOpacity={0.7}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color="#FFF" />
            ) : (
                <Text style={styles.fabText}>PDF</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#007AFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 6
    },
    disabledButton: {
        backgroundColor: '#A0A0A0'
    },
    fabText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '700'
    }
});
