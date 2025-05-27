import React, { useContext } from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";
import { UserContext } from "../context/UserContext";
import { PresenceListScreen } from "../pages/PresenceListScreen";
import { SettingsScreen } from "../pages/SettingsScreen";
import { StatisticsScreen } from "../pages/StatisticsScreen";
import { useTheme } from "../context/ThemeContext";
import {CardDivider} from "@rneui/base/dist/Card/Card.Divider";
import {useTranslation} from "react-i18next";

type DrawerParamList = {
    "student list": undefined;
    Settings: undefined;
    Statistics: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function NavigationDrawer() {
    const { t } = useTranslation();
    return (
        <Drawer.Navigator
            initialRouteName="student list"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={({ route }) => {
                const { theme } = useTheme();

                const isDarkMode = theme.dark;
                return {
                    drawerStyle: {
                        backgroundColor: isDarkMode ? theme.colors.background : "#fff",
                        width: 250,
                    },
                    headerShown: true,
                    drawerActiveBackgroundColor: isDarkMode ? theme.colors.primary : "#e3f2fd",
                    drawerActiveTintColor: isDarkMode ? theme.colors.text : "#007bff",
                    drawerInactiveTintColor: isDarkMode ? theme.colors.border : "#333",
                };
            }}
        >
            <Drawer.Screen
                name="student list"
                component={PresenceListScreen}
                options={({ navigation }) => ({
                    title: "Lista de Alunos",
                    headerRight: () => (
                        <Pressable
                            style={{ marginRight: 15 }}
                            onPress={() => console.log("")}
                        >
                            <Ionicons name="time-outline" size={24} color="#007bff" />
                        </Pressable>
                    ),
                })}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: t('settings'),
                }}
            />
            <Drawer.Screen
                name="Statistics"
                component={StatisticsScreen}
                options={{
                    title: t('statistics'),
                }}
            />
        </Drawer.Navigator>
    );
}

function CustomDrawerContent(props: any) {
    const { username } = useContext(UserContext);
    const { theme } = useTheme();
    const { t } = useTranslation();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={[styles.headerContainer, { backgroundColor: theme.colors.card }]}>
                    <Avatar
                        rounded
                        size={50}
                        title={username[0]}
                        containerStyle={[styles.avatar, { backgroundColor: theme.colors.primary }]}
                    />
                    <Text style={[styles.headerText, { color: theme.colors.text }]}>{username}</Text>
                </View>

                <DrawerItem
                    label="Lista de Presença"
                    icon={({ color }) => <Ionicons name="list-outline" size={22} color={color} />}
                    labelStyle={{ color: theme.colors.text }}
                    onPress={() => {
                        if (props.navigation) {
                            props.navigation.navigate("student list");
                        }
                    }}
                />
                <CardDivider/>
                <DrawerItem
                    label="Estatísticas"
                    icon={({ color }) => <Ionicons name="stats-chart-outline" size={22} color={color} />}
                    labelStyle={{ color: theme.colors.text }}
                    onPress={() => props.navigation.navigate("Statistics")}
                />
                <CardDivider/>
            </DrawerContentScrollView>

            <View style={styles.footerContainer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.footerItem,
                        styles.bottomButton,
                        {
                            backgroundColor: pressed ? theme.colors.footerBackgroundPressed : theme.colors.footerBackground,
                            marginBottom: 10
                        }
                    ]}
                    onPress={() => props.navigation.navigate("Settings")}
                >
                    <Ionicons name="settings-outline" size={22} color={theme.colors.footerText} />
                    <Text style={[styles.footerText, { color: theme.colors.footerText }]}>{t('settings')}</Text>
                </Pressable>


                <Pressable
                    style={({ pressed }) => [
                        styles.footerItem,
                        styles.bottomButton,
                        {
                            backgroundColor: pressed ? "#fb6767" : "#ff4d4d",
                            marginBottom: 10
                        }
                    ]}
                    onPress={() => {}}
                >
                    <Ionicons name="log-out-outline" size={22} color="#fff" />
                    <Text style={styles.logoutText}>{t('logout')}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "transparent",
        marginBottom: 10,
        borderRadius: 10,
    },
    avatar: {
        marginRight: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        height: 1,
        marginVertical: 10,
    },
    footerContainer: {
        marginTop: 20,
        paddingBottom: 10,
    },
    footerItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
    },
    footerText: {
        fontSize: 18,
        marginLeft: 10,
    },
    bottomButton: {
        flexDirection: "row",
        alignItems: "center",
        width: 245,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
        elevation: 3,
    },
    logoutText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "600",
        marginLeft: 10,
    },
});
