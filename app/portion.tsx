import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


const Label: React.FC<{ text: string }> = ({ text }) => (
    <Text style={styles.label}>{text}</Text>
);

const Counter: React.FC<{
    label: string;
    count: number;
    onIncrease: () => void;
    onDecrease: () => void;
}> = ({ label, count, onIncrease, onDecrease }) => (
    <View style={styles.counterContainer}>
        <Label text={label} />
        <View style={styles.counterBox}>
            <TouchableOpacity style={styles.counterButtonMinus} onPress={onDecrease}>
                <Text style={styles.minusIcon}>{"-"}</Text>
            </TouchableOpacity>
            <View style={styles.counterValue}>
                <Text style={styles.counterText}>{count}</Text>
            </View>
            <TouchableOpacity style={styles.counterButtonPlus} onPress={onIncrease}>
                <Text style={styles.plusIcon}>{"+"}</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const MealPlanningPortions: React.FC = () => {
    // State for counters
    const [adults, setAdults] = useState(0);
    const [kids, setKids] = useState(0);
    const [breakfast, setBreakfast] = useState(1);
    const [lunch, setLunch] = useState(1);
    const [dinner, setDinner] = useState(1);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
            <View style={styles.navBar}>
                    <Text style={styles.navButtonBack}>{"<"} </Text>
                </View>
                <Text style={styles.headerText}>Meal Planning - Portions</Text>
                <View style={styles.headerSpacer} />
            </View>

            {/* Body */}
            <View style={styles.body}>
                {/* Section: How many people */}
                <View style={styles.section}>
                    <Text style={styles.questionHeader}>How many people are you planning for?</Text>
                    <Counter
                        label="Adults:"
                        count={adults}
                        onIncrease={() => setAdults(adults + 1)}
                        onDecrease={() => setAdults(Math.max(0, adults - 1))}
                    />
                    <Counter
                        label="Kids:"
                        count={kids}
                        onIncrease={() => setKids(kids + 1)}
                        onDecrease={() => setKids(Math.max(0, kids - 1))}
                    />
                </View>

                {/* Section: How many dishes */}
                <View style={styles.section}>
                    <Text style={styles.questionHeader}>How many dishes to include in each meal?</Text>
                    <Counter
                        label="Breakfast:"
                        count={breakfast}
                        onIncrease={() => setBreakfast(breakfast + 1)}
                        onDecrease={() => setBreakfast(Math.max(0, breakfast - 1))}
                    />
                    <Counter
                        label="Lunch:"
                        count={lunch}
                        onIncrease={() => setLunch(lunch + 1)}
                        onDecrease={() => setLunch(Math.max(0, lunch - 1))}
                    />
                    <Counter
                        label="Dinner:"
                        count={dinner}
                        onIncrease={() => setDinner(dinner + 1)}
                        onDecrease={() => setDinner(Math.max(0, dinner - 1))}
                    />
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EDE9E8",
        justifyContent: "space-between",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EDE9E8",
        padding: 16,
        // borderBottomWidth: 1,
        // borderBottomColor: "#CCCCCC",
        marginTop: 60,
    },
    navBar: {
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center', // Vertically center items
        justifyContent: 'flex-start', // Align content to the left
    },
    navButtonBack: {
        fontSize: 30,
        fontWeight: "500",
        height: 40,
        width: 30
    },
    iconContainer: {
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: 10,
        height: 20,
        borderWidth: 2,
        borderColor: "#1B1918",
    },
    headerText: {
        flex: 1,
        textAlign: "center",
        fontSize: 18,
        fontFamily: "Poppins",
        fontWeight: "400",
        color: "#1B1918",
    },
    headerSpacer: {
        width: 30,
    },
    body: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    section: {
        width: "100%",
        marginBottom: 45,
    },
    questionHeader: {
        fontSize: 28,
        fontFamily: 'Poppins',
        fontWeight: 500,
        lineHeight: 36,
        textAlign: "left",
        marginBottom: 20,
        marginTop: 20,
    },
    label: {
        fontSize: 20,
        fontFamily: "Poppins",
        fontWeight: "400",
        color: "#1B1918",
    },
    counterContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    counterBox: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 16,
        borderRadius: 4,
        overflow: "hidden",
    },
    counterButtonMinus: {
        width: 44,
        height: 44,
        backgroundColor: "#D9D7D7",
        justifyContent: "center",
        alignItems: "center",
    },
    counterButtonPlus: {
        width: 44,
        height: 44,
        backgroundColor: "#B9D774",
        justifyContent: "center",
        alignItems: "center",
    },
    minusIcon: {
        fontSize: 18,
        color: "#8F8F8F",
    },
    plusIcon: {
        fontSize: 18,
        color: "#1B1918",
    },
    counterValue: {
        width: 44,
        height: 44,
        backgroundColor: "#FAF8F7",
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#CCCCCC",
    },
    counterText: {
        fontSize: 18,
        fontFamily: "Poppins",
        fontWeight: "400",
        color: "#1B1918",
    },
    footer: {
        padding: 16,
        alignItems: "center",
    },
    continueButton: {
        width: "100%",
        height: 48,
        backgroundColor: "#F4A691",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 60,
    },
    continueText: {
        fontSize: 18,
        fontFamily: "Poppins",
        fontWeight: "500",
        color: "#1B1918",
    },
});

export default MealPlanningPortions;
