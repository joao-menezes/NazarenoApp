import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import NavigationDrawer from "./navigation/NavigationDrawer";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './i18n';
import CustomToast from "./Components/CustomToast";

const AppContent: React.FC = () => {
    const { theme } = useTheme();

    const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

    return (
        <NavigationContainer
            theme={{
                ...navigationTheme,
                colors: {
                    ...navigationTheme.colors,
                    background: theme.colors.background,
                    text: theme.colors.text,
                    border: theme.colors.border,
                    notification: theme.colors.notification,
                },
                fonts: {
                    regular: {
                        fontFamily: theme.fonts.regular,
                        fontWeight: 'bold'
                    },
                    bold: {
                        fontFamily: theme.fonts.bold,
                        fontWeight: 'bold'
                    },
                    medium: {
                        fontFamily: '',
                        fontWeight: 'bold'
                    },
                    heavy: {
                        fontFamily: '',
                        fontWeight: 'bold'
                    }
                },
            }}
        >
            <UserProvider>
                <NavigationDrawer />
            </UserProvider>
            <CustomToast />
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}
