import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageProps, Image } from 'react-native';
import { useRouter } from 'expo-router';
// Define a type for any props if necessary, currently none are used
// For nutrition
type NavBarProps = {
    onBackPress?: () => void;  // Optional onBackPress event handler
};

const NavBar: React.FC<NavBarProps> = ({ onBackPress }) => {
    const router = useRouter();
    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            router.back();
        }
    };
    return (
        <View style={styles.navContainer}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <Image source={require('@/assets/images/chevron-left.png')} style={styles.backButton} />
            </TouchableOpacity>
            <Text style={styles.navHeader}>Dietary preferences</Text>
            <Image source={require('@/assets/images/Frame.png')} style={styles.frameButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'EDE9E8',
        marginTop:50,
        marginBottom: 20,
    },
    backButton: {
        //padding: 10, // Ensure the touch area is large enough for usability
        textAlign: 'left',
        width: 40,
        height: 40,
        //marginBottom: 40,
    },
    navHeader: {
        flex: 1,
        color: "var(--Text-Primary, #1B1918)",
        textAlign: "center",
        fontFamily: "Poppins",
        fontSize: 23,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: 24,
        marginLeft: -10
    },
    frameButton:{
        marginRight: 10,
        width: 25,
        height: 25,
    },
});

export default NavBar;
