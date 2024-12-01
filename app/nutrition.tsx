import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import OptionButton from "./OptionButton";
import {storePreferences, getPreferenceFormData} from "@/api";

type Option = 'Low Carb' | 'High Protein' | 'Low Fat' | 'Low Sodium' | 'Low Calorie' | 'No preference';

const NutritionalPreferences: React.FC = () => {
    const router = useRouter();
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]); // Initialize with an empty array
    const [queriedOptions, setQueriedOptions] = useState<Option[]>([]); // Initialize with an empty array

    const options: Option[] = [
        "Low Carb",
        "High Protein",
        "Low Fat",
        "Low Sodium",
        "Low Calorie",
        "No preference",
    ];

    useEffect(() => {
        const fetchData = async () => {
            // Check if the user has already localStorage data for nutrition
            const data = await getPreferenceFormData("nutrition") as unknown as [] | null;
            if (data) { // Ensure data is an array
                setSelectedOptions(data as Option[]);
                setQueriedOptions(data as Option[]);
            }
        };

        fetchData().catch((err) => {}); // Add error handling
    }, []);

    const handleSelectOption = (option: Option) => {
        setSelectedOptions((prev) => {
            if (!prev) return [option]; // Handle case where prev is undefined
            if (prev.includes(option)) {
                return prev.filter((item) => item !== option);
            } else {
                return [...prev, option];
            }
        });
    };

    const handleContinue = async () => {
        if (selectedOptions.length > 0 && selectedOptions !== queriedOptions) {
            try {
                await storePreferences("nutrition", selectedOptions);
                router.push("/dietary");
            } catch (err) {
                console.error("Error storing preferences:", err);
            }
        }else {
            router.push("/dietary");
        }
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
            <Text style={styles.questionText}>Do you have any</Text>
            <Text style={styles.questionText2}> nutritional preferences?</Text>

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
            <TouchableOpacity
                style={[
                    styles.continueButton,
                    selectedOptions.length === 0 && styles.inactiveContinueButton
                ]}
                onPress={handleContinue}
                disabled={selectedOptions.length === 0}
            >
                <Text style={[
                    styles.continueButtonText,
                    selectedOptions.length === 0 && styles.inactiveContinueButtonText
                ]}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EDE9E8",
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
    inactiveContinueButton: {
        backgroundColor: "#D3D3D3",
    },
    continueButtonText: {
        color: "#1B1918",
        fontSize: 18,
        fontFamily: "Poppins",
        fontWeight: "500",
    },
    inactiveContinueButtonText: {
        color: "#808080",
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
        marginTop: 40,
        textAlign: "left",
        marginLeft:20,
        fontWeight: '500',
    },
    questionText2:{
        fontSize: 28,
        color: "black",
        textAlign: "left",
        marginBottom: 30,
        marginLeft:20,
        fontWeight: '500',
    },
});

export default NutritionalPreferences;
