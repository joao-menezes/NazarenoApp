import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

type Props = {
    toggleTheme: () => void;
};

const ThemeToggleButton: React.FC<Props> = ({ toggleTheme }) => {
    const theme = useTheme();

    return (
        <TouchableOpacity
            onPress={toggleTheme}
            style={[styles.toggleButton, { backgroundColor: theme.colors.card }]}
            activeOpacity={0.7}
        >
            <Feather
                name={theme.dark ? 'sun' : 'moon'}
                size={24}
                color={theme.dark ? theme.colors.primary : theme.colors.text}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    toggleButton: {
        padding: 12,
        borderRadius: 50,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
});

export default ThemeToggleButton;
