import React, { useState } from 'react';
import OptionButton from './OptionButton';
import { useRouter } from 'expo-router';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';

type Option = 'Keto' | 'Paleo' | 'Vegetarian' | 'Vegan' | 'Pescatarian' | 'No preference';

const DietaryPreferences: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null); // Single selection state
    const router = useRouter();

    const options: Option[] = [
        'Keto',
        'Paleo',
        'Vegetarian',
        'Vegan',
        'Pescatarian',
        'No preference'
    ];

    const handleSelectOption = (option: Option) => {
        setSelectedOption(option === selectedOption ? null : option); // Toggle selection
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Dietary Preferences</Text>
                <Image source={require('@/assets/images/Frame.png')} style={styles.frameButton} />
            </View>

            {/* Question Section */}
            <Text style={styles.questionText}>Would you like recipes </Text>
            <Text style={styles.questionText2}>based on a certain diet?</Text>

            {/* Options Section */}
            {options.map((option) => (
                <OptionButton
                    key={option}
                    text={option}
                    isSelected={selectedOption === option}
                    onPress={() => handleSelectOption(option)}
                    icon={selectedOption === option ? require('@/assets/images/yes.png') : undefined}
                />
            ))}

            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton} onPress={() => router.push("/allergy")}>
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
        marginLeft: 70
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: "Poppins",
        fontWeight: "400",
        textAlign: "center",
        color: "#1B1918",
        marginTop: 50,
        marginLeft: 100,
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

export default DietaryPreferences;
