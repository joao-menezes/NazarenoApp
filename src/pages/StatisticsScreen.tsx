import React, {useCallback, useEffect, useState} from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {useTranslation} from "react-i18next";
import {useTheme} from "../context/ThemeContext";
import {ApiService} from "../service/api.service";
import {RoleEnum} from "../common/enums/role.enum";
import {User} from "../common/interface/user.interface";
import {Avatar} from "@rneui/themed";
import toastService from "../service/toast.service";
import {Ionicons} from "@expo/vector-icons";

export const StatisticsScreen = () => {
    const {t} = useTranslation();
    const {theme} = useTheme();

    const TOTAL_CLASSES = 100;

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);

            const response = await ApiService.getUsers();

            if (!response?.Users || !Array.isArray(response.Users)) {
                throw new Error(t("invalidResponseStructure"));
            }

            const normalizedUsers = response.Users.map((user: any) => ({
                userId: user.id,
                username: user.username,
                userPicUrl: user.userPicUrl ?? 'https://placehold.co/100x100',
                attendance: Number(user.attendance) || 0,
                role: user.role,
            }));

            setUsers(normalizedUsers);
        } catch (err) {
            toastService.showError(t("errorFetchingUsers"));
        } finally {
            setLoading(false);
        }
    }, [t]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const usersWithAttendance = Array.isArray(users)
        ? users.map(user => ({
            ...user,
            totalClasses: TOTAL_CLASSES,
            attendedClasses: Number(user.attendance) || 0,
        }))
        : [];

    const totalPresence = usersWithAttendance.reduce(
        (acc, user) => acc + user.attendedClasses,
        0
    );

    const calculatePresencePercentage = (
        attended: number,
        totalClasses: number,
        totalUsers: number
    ): number => {
        if (totalUsers === 0) return 0;
        return (attended / (totalClasses * totalUsers)) * 100;
    };

    const averagePresence = calculatePresencePercentage(
        totalPresence,
        TOTAL_CLASSES,
        usersWithAttendance.length
    );

    const monthlyPresence = calculatePresencePercentage(
        totalPresence,
        TOTAL_CLASSES,
        usersWithAttendance.length
    );

    const annualPresence = calculatePresencePercentage(
        totalPresence,
        240,
        usersWithAttendance.length
    );

    const sortedUsers = [...usersWithAttendance].sort(
        (a, b) => b.attendedClasses - a.attendedClasses
    );

    const top3Students = sortedUsers
        .filter(user => user.role === RoleEnum.Student)
        .slice(0, 3);

    return (
        <>
            <ScrollView
                style={[styles.container, {backgroundColor: theme.colors.background}]}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.header}>
                    <Text style={[styles.title, {color: theme.colors.text}]}>
                        {t("attendanceStats")}
                    </Text>
                    <TouchableOpacity
                        style={[styles.refreshButton, {backgroundColor: theme.colors.primary}]}
                        onPress={fetchUsers}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="refresh-outline" size={20} color="white"/>
                    </TouchableOpacity>
                </View>

                <View
                    style={[styles.statsContainer, {backgroundColor: theme.colors.card}]}
                >
                    <Text style={[styles.statText, {color: theme.colors.text}]}>
                        {t("averageAttendance")}:{" "}
                        <Text style={[styles.statHighlight, {color: theme.colors.primary}]}>
                            {averagePresence.toFixed(2)}%
                        </Text>
                    </Text>
                </View>

                <View
                    style={[styles.statsContainer, {backgroundColor: theme.colors.card}]}
                >
                    <Text style={[styles.statText, {color: theme.colors.text}]}>
                        {t("monthlyAverage")}:{" "}
                        <Text style={[styles.statHighlight, {color: theme.colors.primary}]}>
                            {monthlyPresence.toFixed(2)}%
                        </Text>
                    </Text>
                    <Text style={[styles.statText, {color: theme.colors.text}]}>
                        {t("annualAverage")}:{" "}
                        <Text style={[styles.statHighlight, {color: theme.colors.primary}]}>
                            {annualPresence.toFixed(2)}%
                        </Text>
                    </Text>
                </View>

                <Text style={[styles.subTitle, {color: theme.colors.text}]}>
                    {t("attendancePerStudent")}
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingRight: 20}}
                >
                    <LineChart
                        data={{
                            labels:
                                sortedUsers.length > 0
                                    ? sortedUsers.map((user) => user.username.split(".")[0])
                                    : ["No data"],
                            datasets: [
                                {
                                    data:
                                        sortedUsers.length > 0
                                            ? sortedUsers.map((user) => user.attendedClasses)
                                            : [0],
                                    strokeWidth: 2,
                                },
                            ],
                        }}
                        width={Math.max(
                            Dimensions.get("window").width,
                            sortedUsers.length * 70
                        )}
                        height={220}
                        chartConfig={{
                            backgroundColor: theme.colors.card,
                            backgroundGradientFrom: theme.colors.primary,
                            backgroundGradientTo: theme.colors.primary,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            strokeWidth: 2,
                            barPercentage: 0.5,
                            propsForDots: {
                                r: "5",
                                strokeWidth: "2",
                                stroke: theme.colors.primary,
                            },
                        }}
                        style={styles.chart}
                        bezier
                    />
                </ScrollView>

                <Text style={[styles.subTitle, { color: theme.colors.text }]}>
                    🎖️ {t("top3Students")}
                </Text>

                {top3Students.map((student, index) => (
                    <View
                        key={student.userId}
                        style={[styles.topStudentContainer, { backgroundColor: theme.colors.card }]}
                    >
                        <Avatar rounded size={56} source={{ uri: student.userPicUrl }} />
                        <View style={styles.userInfo}>
                            <Text style={[styles.userName, { color: theme.colors.text }]}>
                                {`${index + 1}º - ${student.username}`}
                            </Text>
                            <Text style={[styles.userPresence, { color: theme.colors.primary }]}>
                                {student.attendedClasses} / {TOTAL_CLASSES} {t("attendances")}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    refreshButton: {
        borderRadius: 15, // círculo perfeito (30/2)
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 15,
        textAlign: "center",
    },
    statsContainer: {
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderRadius: 16,
        elevation: 6,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    statText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 8,
    },
    statHighlight: {
        fontWeight: "700",
    },
    chart: {
        marginVertical: 20,
        borderRadius: 16,
        elevation: 3,
    },
    topStudentContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
    },
    userInfo: {
        marginLeft: 15,
    },
    userName: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 4,
    },
    userPresence: {
        fontSize: 16,
        fontWeight: "600",
    },
});

