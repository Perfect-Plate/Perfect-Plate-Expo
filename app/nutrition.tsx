import React, { useState } from 'react';
import OptionButton from './OptionButton';
import { useRouter } from 'expo-router';
import NavBar from './NavBar';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';

type Option = 'Low Carb' | 'High Protein' | 'Low Fat' | 'Low Sodium' | 'Low Calorie' | 'No preference';

const NutritionalPreferences: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]); // Track multiple selections
    const router = useRouter();

    const options: Option[] = [
        'Low Carb',
        'High Protein',
        'Low Fat',
        'Low Sodium',
        'Low Calorie',
        'No preference'
    ];

    const handleSelectOption = (option: Option) => {
        setSelectedOptions((prev) => {
            if (prev.includes(option)) {
                // If already selected, remove it
                return prev.filter((item) => item !== option);
            } else {
                // If not selected, add it
                return [...prev, option];
            }
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <NavBar/>
            <Text style={styles.header}>Do you have any nutritional preferences?</Text>
            {options.map((option) => (
                <OptionButton
                    key={option}
                    text={option}
                    isSelected={selectedOptions.includes(option)} // Check if this option is selected
                    onPress={() => handleSelectOption(option)}
                    icon={selectedOptions.includes(option) ? require('@/assets/images/yes.png') : undefined}
                />
            ))}
            <TouchableOpacity style={styles.continueButton} onPress={() => router.push('/dietary')}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#EDE9E8'
    },
    header: {
        color: '#1B1918', 
        fontFamily: 'Poppins', 
        fontSize: 34,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 36, 
        letterSpacing: -0.56,
        marginBottom: 20,
    },
    continueButton: {
        backgroundColor: '#F4A691',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 90
    },
    continueButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default NutritionalPreferences;
