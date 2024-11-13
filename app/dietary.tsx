import React, { useState } from 'react';
import OptionButton from './OptionButton'
import NavBar from './NavBar';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';

type Option = 'Keto' | 'Paleo' | 'Vegetarian' | 'Vegan' | 'Pescatarian' | 'None Necessary';

const DietaryPreferences: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const options: Option[] = [
        'Keto',
        'Paleo',
        'Vegetarian',
        'Vegan',
        'Pescatarian',
        'None Necessary'
    ];

    const handleSelectOption = (option: Option) => {
        setSelectedOption(option);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <NavBar/>
            <Text style={styles.header}>Select Your Dietary Preferences</Text>
            {options.map((option) => (
                <OptionButton
                    key={option}
                    text={option}
                    isSelected={selectedOption === option}
                    onPress={() => handleSelectOption(option)}
                    icon={selectedOption === option ? require('@/assets/images/yes.png') : undefined} // Adjust the path as necessary
                />
            ))}
            <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'left'
    },
    continueButton: {
        backgroundColor: '#d20503',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30
    },
    continueButtonText: {
        color: 'white',
        //fontStyle: '700Bold',
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default DietaryPreferences;
