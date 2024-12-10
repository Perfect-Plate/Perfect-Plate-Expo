import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import NavBar from "./NavBar";

const calendarEmpty: React.FC = () => {
    const today = new Date();
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay())
    );
    const [selectedDay, setSelectedDay] = useState<Date | null>(today); // Default selected day is today

    const getWeek = (startDate: Date) => {
        const week = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
            week.push(day);
        }
        return week;
    };

    const isDaySelectable = (date: Date) => {
        const today = new Date();
        const twoWeeksLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
        return date >= today && date <= twoWeeksLater;
    };

    const toggleDay = (date: Date) => {
        if (isDaySelectable(date)) {
            setSelectedDay(date); // Allow only one day to be selected
        }
    };

    const renderDay = (date: Date) => {
        const isSelected = selectedDay && selectedDay.getDate() === date.getDate() && selectedDay.getMonth() === date.getMonth() && selectedDay.getFullYear() === date.getFullYear();
        const isSelectable = isDaySelectable(date);

        return (
            <TouchableOpacity
                key={date.getTime()}
                style={[
                    styles.day,
                    isSelected ? styles.daySelected : styles.dayDefault,
                    !isSelectable && styles.dayNotSelectable,
                ]}
                onPress={() => toggleDay(date)}
                disabled={!isSelectable}
            >
                <Text style={isSelected ? styles.dayTextSelected : styles.dayText}>
                    {date.getDate()}
                </Text>
                <Text style={styles.dayLabel}>
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                </Text>
            </TouchableOpacity>
        );
    };

    const handleWeekChange = (direction: "prev" | "next") => {
        setCurrentWeekStart((prev) => {
            const offset = direction === "next" ? 7 : -7;
            return new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + offset);
        });
    };

    const week = getWeek(currentWeekStart);

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Image source={require("@/assets/images/background.png")} style={styles.headerImage} />
                <Text style={styles.headerText}>Your Meal Plans</Text>
                {/* Calendar */}
                <View style={styles.calendarSection}>
                    <View style={styles.calendarHeader}>
                        <TouchableOpacity
                            onPress={() => handleWeekChange("prev")}
                            style={styles.navButton}
                        >
                            <Image
                                source={require("@/assets/images/left.png")}
                                style={styles.navIcon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.calendarMonth}>
                            {week[0].toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        </Text>
                        <TouchableOpacity
                            onPress={() => handleWeekChange("next")}
                            style={styles.navButton}
                        >
                            <Image
                                source={require("@/assets/images/right.png")}
                                style={styles.navIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.weekRow}>{week.map((date) => renderDay(date))}</View>
                </View>
            </View>

            {/* Selected Date Display */}
            <View style={styles.selectedDateContainer}>
                <Text style={styles.selectedDateText}>
                    {selectedDay ? selectedDay.toDateString() : "None"}
                </Text>
            </View>

            {/* Floating Meal Plan Section */}
            <View style={styles.mealPlanSection}>
                <TouchableOpacity style={styles.generateButton}>
                    <Text style={styles.generateButtonText}>Generate more meals</Text>
                </TouchableOpacity>
            </View>

            <Image
                source={require("@/assets/images/empty.png")}
                style={styles.empty}
            />
            <Text style={styles.mealText}>Your meal plan is empty</Text>
            <Text style={styles.emptyText2}>You haven’t set up a meal plan yet. Let’s</Text>
            <Text style={styles.emptyText}>create one and fill your calendar!</Text>

            {/* Navigation Bar */}
            <NavBar currentPage="calendar" onNavigate={(page) => console.log(page)} />
        </View>
    );
};

// Reusable Section Component
const Section: React.FC<{ title: string; items: { image: any; name: string }[] }> = ({
    title,
    items,
}) => (
    <View style={styles.section}>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <View style={styles.sectionContent}>
            {items.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                    <Image style={styles.recipeImage} source={item.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.recipeName}>{item.name}</Text>
                    </View>
                    <TouchableOpacity style={styles.moreIconContainer}>
                        <Image
                            style={styles.moreIcon}
                            source={require("@/assets/images/more.png")}
                        />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EDE9E8",
    },
    header: {
        height: 292,
        padding: 16,
        justifyContent: "flex-end",
    },
    headerImage: {
        position: "absolute",
        width: "110%",
        height: 292,
        resizeMode: "cover",
    },
    headerText: {
        fontSize: 32,
        color: "#1B1918",
        fontFamily: "Poppins",
        fontWeight: "500",
        marginTop: 180,
        marginBottom: 10,
    },
    selectedDateContainer: {
        padding: 16,
        marginTop: 10,
    },
    selectedDateText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#333",
    },
    body: {
        flex: 1,
        marginTop: 10,
    },
    section: {
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        color: "#1B1918",
        fontFamily: "Poppins",
        fontWeight: "500",
    },
    sectionContent: {
        flexDirection: "column",
        gap: 16,
    },
    mealText: {
        flex:1,
        fontSize: 24,
        marginLeft:90,
        marginBottom: 20,
    },
    emptyText:{
        flex:1,
        fontSize: 16,
        marginLeft: 97,
        marginTop:-130,
    },
    emptyText2:{
        flex:1,
        fontSize: 16,
        marginLeft: 70,
        marginTop:-130,
    },
    itemContainer: {
        flexDirection: "row",
        backgroundColor: "#FFF",
        borderRadius: 12,
        overflow: "hidden",
        elevation: 2,
        marginBottom: 8,
        alignItems: "center",
        padding: 8,
    },
    recipeImage: {
        width: 150,
        height: 100,
        resizeMode: "cover",
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 8,
    },
    recipeName: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    moreIconContainer: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    moreIcon: {
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
    mealPlanSection: {
        position: "absolute",
        bottom: 80,
        left: 16,
        right: 16,
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        marginBottom: 20,
    },
    generateButton: {
        backgroundColor: "#F4A691",
        borderRadius: 40,
        paddingVertical: 8,
        paddingHorizontal: 32,
        height: 48,
        width: 400,
        marginTop: 4,
    },
    generateButtonText: {
        fontSize: 18,
        color: "#141412",
        fontFamily: "Poppins",
        fontWeight: "500",
        marginLeft: 85,
        marginTop: 4,
    },
    calendarSection: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 10,
        marginTop: 8,
        marginBottom: 8,
    },
    calendarHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    calendarMonth: {
        fontSize: 24,
        fontWeight: "500",
        color: "#333",
    },
    navButton: {
        padding: 10,
    },
    navIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
    weekRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    day: {
        width: 40,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: "#DDD",
    },
    dayDefault: {
        backgroundColor: "#C5E47F",
    },
    daySelected: {
        backgroundColor: "#F4A691",
    },
    dayNotSelectable: {
        opacity: 0.3,
        backgroundColor: "white",
    },
    dayText: {
        fontSize: 16,
        color: "#333",
    },
    dayTextSelected: {
        fontSize: 16,
        color: "black",
    },
    dayLabel: {
        fontSize: 12,
        color: "#737170",
        marginTop: 4,
    },
    empty:{
        marginLeft: -45,
    }
});

export default calendarEmpty;
