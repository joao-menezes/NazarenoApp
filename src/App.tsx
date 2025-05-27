import React, {useState} from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import NavigationDrawer from "./navigation/NavigationDrawer";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './i18n';
import CustomToast from "./Components/CustomToast";
import {PdfButton} from "./Components/PdfButton";
import ToastService from "./service/toast.service";
import {ReportService} from "./service/report.service";

const AppContent: React.FC = () => {
    const { theme } = useTheme();

    const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

    const [loading, setLoading] = useState(false);

    const handleDownloadReport = async () => {
        try {
            setLoading(true);
            await ReportService.DownloadReport();
        } catch (error) {
            ToastService.showError('Erro', 'Falha ao baixar o relatório.');
        } finally {
            setLoading(false);
        }
    };

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
            <PdfButton onPress={handleDownloadReport} loading={loading} />
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
