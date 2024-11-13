import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet, ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';

interface OptionButtonProps {
    text: string;
    isSelected: boolean;
    onPress: () => void;
    icon?: ImageSourcePropType;
}

const OptionButton: React.FC<OptionButtonProps> = ({ text, isSelected, onPress, icon }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, isSelected && styles.selected]}>
            <Text style={styles.text}>{text}</Text>
            {isSelected && icon && (
                <Image
                    source={icon}
                    style={styles.checkmark}
                />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9e7de', //color for button background
        paddingVertical: 25,
        paddingHorizontal: 25,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: '#ddd',
        marginBottom: 10,
    },
    selected: {
        backgroundColor: '#f9e7de', // Highlight color when selected
    },
    text: {
        flex: 1,
        fontSize: 20,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    checkmark: {
        width: 30,
        height: 30,
        position: 'absolute',
        right: 25, // Adjust according to your layout needs
    },
});

export default OptionButton;
