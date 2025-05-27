import React from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    Image,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { mockedUser } from "../mocked";
import { RoleEnum } from "../common/enums/role.enum";

export const StatisticsScreen = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();

    const TOTAL_CLASSES = 100;

    const usersWithAttendance = mockedUser.map((user) => ({
        ...user,
        totalClasses: TOTAL_CLASSES,
        attendedClasses: user.attendance,
    }));

    const totalPresence = usersWithAttendance.reduce(
        (acc, user) => acc + user.attendedClasses,
        0
    );

    const averagePresence =
        usersWithAttendance.length > 0
            ? (totalPresence / (usersWithAttendance.length * TOTAL_CLASSES)) * 100
            : 0;

    const totalMonthlyClasses = TOTAL_CLASSES * usersWithAttendance.length;
    const monthlyPresence = (totalPresence / totalMonthlyClasses) * 100;

    const totalAnnualClasses = 240 * usersWithAttendance.length;
    const annualPresence = (totalPresence / totalAnnualClasses) * 100;

    const sortedUsers = [...usersWithAttendance].sort(
        (a, b) => b.attendedClasses - a.attendedClasses
    );

    const top3Students = sortedUsers
        .filter((user) => user.role === RoleEnum.Student)
        .slice(0, 3);

    return (
        <ScrollView
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 40,
                paddingTop: 30,
            }}
        >
            <Text style={[styles.title, { color: theme.colors.text }]}>
                {t("attendanceStats")}
            </Text>

            <View
                style={[
                    styles.statsContainer,
                    { backgroundColor: theme.colors.card },
                ]}
            >
                <Text style={[styles.statText, { color: theme.colors.text }]}>
                    {t("averageAttendance")}:{" "}
                    <Text
                        style={[
                            styles.statHighlight,
                            { color: theme.colors.primary },
                        ]}
                    >
                        {averagePresence.toFixed(2)}%
                    </Text>
                </Text>
            </View>

            <View
                style={[
                    styles.statsContainer,
                    { backgroundColor: theme.colors.card },
                ]}
            >
                <Text style={[styles.statText, { color: theme.colors.text }]}>
                    {t("monthlyAverage")}:{" "}
                    <Text
                        style={[
                            styles.statHighlight,
                            { color: theme.colors.primary },
                        ]}
                    >
                        {monthlyPresence.toFixed(2)}%
                    </Text>
                </Text>
                <Text style={[styles.statText, { color: theme.colors.text }]}>
                    {t("annualAverage")}:{" "}
                    <Text
                        style={[
                            styles.statHighlight,
                            { color: theme.colors.primary },
                        ]}
                    >
                        {annualPresence.toFixed(2)}%
                    </Text>
                </Text>
            </View>

            <Text style={[styles.subTitle, { color: theme.colors.text }]}>
                {t("attendancePerStudent")}
            </Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
            >
                <LineChart
                    data={{
                        labels: sortedUsers.map((user) =>
                            user.username.split(".")[0]
                        ),
                        datasets: [
                            {
                                data: sortedUsers.map(
                                    (user) => user.attendedClasses
                                ),
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
                        color: (opacity = 1) =>
                            `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) =>
                            `rgba(255, 255, 255, ${opacity})`,
                        strokeWidth: 2,
                        barPercentage: 0.5,
                        propsForDots: {
                            r: "5",
                            strokeWidth: "2",
                            stroke: theme.colors.primary,
                        },
                    }}
                    style={styles.chart}
                />
            </ScrollView>

            <Text style={[styles.subTitle, { color: theme.colors.text }]}>
                🎖️ {t("top3Students")}
            </Text>

            {top3Students.map((student, index) => (
                <View
                    key={student.userId}
                    style={[
                        styles.topStudentContainer,
                        { backgroundColor: theme.colors.card },
                    ]}
                >
                    <Image
                        source={{ uri: student.userPicUrl }}
                        style={styles.avatar}
                    />
                    <View>
                        <Text
                            style={[
                                styles.userName,
                                { color: theme.colors.text },
                            ]}
                        >
                            {`${index + 1}º - ${student.username}`}
                        </Text>
                        <Text
                            style={[
                                styles.userPresence,
                                { color: theme.colors.primary },
                            ]}
                        >
                            {student.attendedClasses} / {TOTAL_CLASSES}{" "}
                            {t("attendances")}
                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 10,
        textAlign: "center",
    },
    statsContainer: {
        padding: 20,
        borderRadius: 8,
        elevation: 5,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
    },
    statText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10,
    },
    statHighlight: {
        fontWeight: "bold",
    },
    chart: {
        marginVertical: 20,
        borderRadius: 12,
        elevation: 2,
    },
    topStudentContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    userName: {
        fontSize: 18,
        fontWeight: "600",
    },
    userPresence: {
        fontSize: 16,
        fontWeight: "bold",
    },
});
