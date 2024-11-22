import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import OptionButton from "./OptionButton";

type Option = 'Low Carb' | 'High Protein' | 'Low Fat' | 'Low Sodium' | 'Low Calorie' | 'No preference';

const NutritionalPreferences: React.FC = () => {
    const router = useRouter();
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const options: Option[] = [
        "Low Carb",
        "High Protein",
        "Low Fat",
        "Low Sodium",
        "Low Calorie",
        "No preference",
    ];

    const handleSelectOption = (option: Option) => {
        setSelectedOptions((prev) => {
            if (prev.includes(option)) {
                return prev.filter((item) => item !== option);
            } else {
                return [...prev, option];
            }
        });
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Nutritional Preferences</Text>
                <Image source={require('@/assets/images/Frame.png')} style={styles.frameButton} />
            </View>

            {/* Question Section */}
            <Text style={styles.questionText}>Do you have </Text>
            <Text style={styles.questionText2}>any nutritional preferences?</Text>

            {/* Options Section */}
            {options.map((option) => (
                <OptionButton
                    key={option}
                    text={option}
                    isSelected={selectedOptions.includes(option)}
                    onPress={() => handleSelectOption(option)}
                    icon={selectedOptions.includes(option) ? require('@/assets/images/yes.png') : undefined}
                />
            ))}

            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton} onPress={() => router.push("/dietary")}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
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
    frameButton:{
        marginTop: 50,
        width: 25,
        height: 25,
        marginLeft: 60
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: "Poppins",
        fontWeight: "400",
        textAlign: "center",
        color: "#1B1918",
        marginTop: 50,
        marginLeft: 80,
    },
    questionText: {
        fontSize: 28,
        color: "black",
        marginTop: 50,
        textAlign: "left",
        marginLeft:20,
        fontWeight: '500',
    },
    questionText2:{
        fontSize: 28,
        color: "black",
        textAlign: "left",
        marginBottom: 40,
        marginLeft:20,
        fontWeight: '500',
    },
    continueButton: {
        width: "90%",
        height: 50,
        backgroundColor: "#F4A691",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 60,
        alignSelf: "center",
    },
    continueButtonText: {
        color: "#1B1918",
        fontSize: 18,
        fontFamily: "Poppins",
        fontWeight: "500",
    },
});

export default NutritionalPreferences;
