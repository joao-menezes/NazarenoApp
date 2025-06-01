import React, {useCallback, useEffect, useState} from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Switch,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input, Avatar } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

import { User } from '../common/interface/user.interface';
import { useTheme } from '../context/ThemeContext';
import { filterUsers } from '../service/search.service';
import ToastService from '../service/toast.service';
import { mockedUser } from '../mocked';
import {ApiService} from "../service/api.service";

const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
};

export function PresenceListScreen() {
    const { theme } = useTheme();
    const { t } = useTranslation();

    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            const userData = await ApiService.getUsers();
            setUsers(userData.Users);
            setFilteredUsers(userData.Users);
        } catch (error) {
            console.error('Error fetching users:', error);
            ToastService.showError(t('error'), t('errorFetchingUsers'));
            // setUsers(mockedUser);
            // setFilteredUsers(mockedUser);
        } finally {
            setIsLoading(false);
        }
    }, [t]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = filterUsers(users, query);
        setFilteredUsers(filtered);
    };

    const toggleSelection = (userId: string) => {
        const newSelection = new Set(selectedUserIds);
        if (newSelection.has(userId)) {
            newSelection.delete(userId);
        } else {
            newSelection.add(userId);
        }
        setSelectedUserIds(newSelection);
    };

    const savePresenceList = async () => {
        if (selectedUserIds.size === 0) {
            return ToastService.showInfo(t('attention'), t('noUsersSelected'));
        }

        try {
            // await ApiService.savePresence([...selectedUserIds]);
            ToastService.showSuccess(t('success'), t('presenceListSaved'));
        } catch (error) {
            console.error('Error saving presence list:', error);
            ToastService.showError(t('error'), t('errorSavingPresenceList'));
        }
    };

    const onRefresh = async () => {
        setIsLoading(true);
        try {
            const userData = await ApiService.getUsers();
            setUsers(userData.Users);
            setFilteredUsers(userData.Users);
        } catch (error) {
            console.error('Error fetching users:', error);
            ToastService.showError(t('error'), t('errorFetchingUsers'));
        } finally {
            setIsLoading(false);
        }
    };

    const renderItem = ({ item }: { item: User }) => {
        const age = calculateAge(new Date(item.birthDate));
        const isSelected = selectedUserIds.has(item.userId);

        return (
            <TouchableOpacity
                onPress={() => toggleSelection(item.userId)}
                style={[
                    styles.itemContainer,
                    isSelected && styles.itemSelected,
                    { backgroundColor: theme.colors.card },
                ]}
                activeOpacity={0.9}
            >
                {item.userPicUrl ? (
                    <Avatar
                        rounded
                        size={56}
                        source={{ uri: item.userPicUrl }}
                    />
                ) : (
                    <Avatar
                        rounded
                        size={56}
                    />
                )}
                <View style={styles.userInfo}>
                    <Text style={[styles.username, { color: theme.colors.text }]}>
                        {item.username}
                    </Text>
                    <Text style={[styles.age, { color: theme.colors.subtitleText }]}>
                        {t('age')}: {age}
                    </Text>
                </View>
                <Switch
                    trackColor={{ false: '#ccc', true: theme.colors.primary }}
                    thumbColor={isSelected ? '#fff' : '#f4f3f4'}
                    ios_backgroundColor="#d1d1d1"
                    onValueChange={() => toggleSelection(item.userId)}
                    value={isSelected}
                />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

            <Input
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChangeText={handleSearch}
                leftIcon={<Ionicons name="search" size={20} color={theme.colors.text} />}
                inputContainerStyle={[
                    styles.inputContainer,
                    {
                        borderColor: theme.colors.border,
                        backgroundColor: theme.colors.inputBackground,
                    },
                ]}
                inputStyle={{ color: theme.colors.text }}
                placeholderTextColor={theme.colors.placeholder}
                containerStyle={styles.searchContainer}
            />

            <TouchableOpacity
                onPress={savePresenceList}
                style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
                activeOpacity={0.85}
            >
                <Ionicons name="save-outline" size={20} color="#fff" />
                <Text style={styles.saveButtonText}>{t('save')}</Text>
            </TouchableOpacity>

            <FlatList
                data={filteredUsers}
                renderItem={renderItem}
                keyExtractor={(item) => item.userId}
                style={styles.list}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                refreshing={isLoading}
                onRefresh={onRefresh}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    searchContainer: {
        marginVertical: 10,
    },
    inputContainer: {
        borderBottomWidth: 0,
        borderRadius: 20,
        paddingHorizontal: 15,
        elevation: 2,
    },
    saveButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 10,
        marginTop: -5,
        marginHorizontal: 10,
        borderRadius: 12,
        elevation: 2,
    },
    saveButtonText: {
        color: '#fff',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '600',
    },
    list: {
        width: '100%',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        marginVertical: 6,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    itemSelected: {
        borderWidth: 2,
        borderColor: '#4A90E2',
        backgroundColor: '#e6f0ff',
    },
    avatar: {
        borderRadius: 28,
        marginRight: 18,
        backgroundColor: '#e0e0e0',
    },
    avatarPlaceholder: {
        backgroundColor: '#b0bec5',
    },
    userInfo: {
        marginLeft: 10,
        flex: 1,
        justifyContent: 'center',
    },
    username: {
        fontSize: 18,
        fontWeight: '700',
    },
    age: {
        fontSize: 14,
        marginTop: 2,
    },
});
