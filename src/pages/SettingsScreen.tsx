import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import ThemeToggleButton from '../Components/ThemeToggleButton';
import { useTheme } from "../context/ThemeContext";
import {useTranslation} from "react-i18next";
import {Language} from "../common/types/language.types";
import { Picker } from '@react-native-picker/picker';
import i18n from "i18next";
import ToastService from "../service/toast.service";

export const SettingsScreen: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [username, setUsername] = useState('João Silva');
    const [language, setLanguage] = useState<Language>('pt');
    const { t } = useTranslation();

    const handleLanguageChange = (selectedLanguage: Language) => {
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.headerText, { color: theme.colors.text }]}>{t('settings')}</Text>
                <ThemeToggleButton toggleTheme={toggleTheme} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.subtitleText, fontSize: 15 }]}>{t('preferences')}</Text>

                    <Text style={[styles.sectionTitle, { color: theme.colors.subtitleText }]}>{t('language')}</Text>

                    <View style={[styles.dropdownContainer, { backgroundColor: theme.colors.inputBackground }]}>
                        <Picker
                            selectedValue={language}
                            style={{ color: theme.colors.inputText }}
                            dropdownIconColor={theme.colors.primary}
                            onValueChange={handleLanguageChange}
                        >
                            <Picker.Item label="Português" value="pt" />
                            <Picker.Item label="Inglês" value="en" />
                            <Picker.Item label="Espanhol" value="es" />
                        </Picker>
                    </View>
                </View>
                <Pressable
                    onPress={() => {
                        ToastService.showSuccess(t('success'), "Configurações salvas com sucesso");
                    }}
                    style={[styles.footerButton, { backgroundColor: theme.colors.primary }]}
                >
                    <Ionicons name="checkmark-done-outline" size={24} color="#fff" />
                    <Text style={styles.footerButtonText}>{t('saveChanges')}</Text>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    settingItem: {
        marginBottom: 15,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    settingLabel: {
        fontSize: 16,
    },
    input: {
        height: 45,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 6,
    },
    footerButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
    },
    footerButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    dropdownContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#ccc',
        borderWidth: 1,
        marginTop: 10,
    },
});

