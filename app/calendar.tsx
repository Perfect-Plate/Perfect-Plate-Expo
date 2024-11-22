import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

const MealPlanningCalendar: React.FC = () => {
    const router = useRouter();

    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth()); // 0-based
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [selectedDays, setSelectedDays] = useState<number[]>([]);

    const getDaysInMonth = (month: number, year: number) => {
        const firstDay = new Date(year, month, 1).getDay(); // Day of the week (0-6) for the first day
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the month
        const days: (number | null)[][] = [];
        let week: (number | null)[] = Array(firstDay).fill(null); // Fill the first week with nulls
        for (let day = 1; day <= daysInMonth; day++) {
            week.push(day);
            if (week.length === 7) {
                days.push(week);
                week = [];
            }
        }
        if (week.length > 0) {
            while (week.length < 7) week.push(null); // Fill the last week with nulls
            days.push(week);
        }
        return days;
    };

    const handleMonthChange = (direction: "prev" | "next") => {
        setSelectedDays([]);
        if (direction === "prev") {
            if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear((prev) => prev - 1);
            } else {
                setCurrentMonth((prev) => prev - 1);
            }
        } else {
            if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear((prev) => prev + 1);
            } else {
                setCurrentMonth((prev) => prev + 1);
            }
        }
    };

    const toggleDay = (day: number) => {
        setSelectedDays((prev) =>
            prev.includes(day)
                ? prev.filter((d) => d !== day)
                : [...prev, day]
        );
    };

    const renderDay = (day: number | null) => {
        if (!day) return <View style={styles.dayEmpty} />;
        const isSelected = selectedDays.includes(day);

        return (
            <TouchableOpacity
                key={day}
                style={[
                    styles.day,
                    isSelected ? styles.daySelected : styles.dayDefault,
                ]}
                onPress={() => toggleDay(day)}
            >
                <Text style={isSelected ? styles.dayTextSelected : styles.dayText}>
                    {day}
                </Text>
            </TouchableOpacity>
        );
    };

    const days = getDaysInMonth(currentMonth, currentYear);
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meal Planning - Calendar</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.mainHeading}>Which days would you like to plan meals for?</Text>
                <Text style={styles.notation}>Choose specific days, or select a time range</Text>
                <Text style={styles.notation}>(up to 2 weeks)</Text>
            </View>

            {/* Calendar Section */}
            <View style={styles.calendarSection}>
                <View style={styles.calendarHeader}>
                    <TouchableOpacity
                        onPress={() => handleMonthChange("prev")}
                        style={styles.navButton}
                    >
                        <Text style={styles.navButtonText}>{"<"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.calendarMonth}>
                        {monthNames[currentMonth]} {currentYear}
                    </Text>
                    <TouchableOpacity
                        onPress={() => handleMonthChange("next")}
                        style={styles.navButton}
                    >
                        <Text style={styles.navButtonText}>{">"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.weekDays}>
                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                        <Text style={styles.weekDay} key={day}>
                            {day}
                        </Text>
                    ))}
                </View>

                <View style={styles.calendarBody}>
                    {days.map((week, weekIndex) => (
                        <View key={`week-${weekIndex}`} style={styles.calendarRow}>
                            {week.map((day, dayIndex) =>
                                day !== null ? (
                                    renderDay(day)
                                ) : (
                                    <View key={`empty-${weekIndex}-${dayIndex}`} style={styles.dayEmpty} />
                                )
                            )}
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.footerSection}>
                <Text style={styles.selectedText}>
                    Selected Days: {selectedDays.join(", ") || "None"}
                </Text>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => router.push("/portion")}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EDE9E8",
    },
    header: {
        height: 110,
        backgroundColor: "#FFF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
    },
    backButton: {
        position: "absolute",
        left: 16,
    },
    backArrow: {
        fontSize: 24,
        color: "#1B1918",
        marginTop: 50,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: "Poppins",
        fontWeight: "400",
        textAlign: "center",
        color: "#1B1918",
        marginTop: 50,
    },
    content: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    mainHeading: {
        fontSize: 24,
        fontWeight: "500",
        color: "#1B1918",
        textAlign: "left",
        marginBottom: 8,
    },
    notation: {
        fontSize: 16,
        fontWeight: "400",
        color: "#737170",
    },
    calendarSection: {
        flex: 1,
        backgroundColor: "#FFF",
        borderRadius: 12,
        margin: 16,
        padding: 16,
    },
    calendarHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    calendarMonth: {
        fontSize: 18,
        fontWeight: "500",
    },
    navButton: {
        padding: 10,
    },
    navButtonText: {
        fontSize: 30,
        fontWeight: "500",
    },
    weekDays: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    weekDay: {
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
        color: "#737170",
    },
    calendarBody: {
        flex: 1,
    },
    calendarRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    day: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        margin: 4,
        borderRadius: 20,
    },
    dayDefault: {
        backgroundColor: "#EDE9E8",
    },
    daySelected: {
        backgroundColor: "#C5E47F",
    },
    dayText: {
        fontSize: 16,
        color: "#333",
    },
    dayTextSelected: {
        fontSize: 16,
        color: "#FFF",
    },
    dayEmpty: {
        width: 40,
        height: 40,
    },
    footerSection: {
        padding: 16,
        backgroundColor: "#FFF",
    },
    selectedText: {
        fontSize: 16,
        marginBottom: 8,
    },
    continueButton: {
        backgroundColor: "#F4A691",
        padding: 12,
        borderRadius: 40,
        height: 50,
        alignItems: "center",
        marginBottom: 25,
    },
    continueButtonText: {
        fontSize: 16,
        fontWeight: "500",
    },
});

export default MealPlanningCalendar;
