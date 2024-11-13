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
                <Image source={require('@/assets/images/backbutton.png')} style={styles.backButton} />
                <Text style={styles.navText}>{""}</Text>
            </TouchableOpacity>
            <Image source={require('@/assets/images/forkicon.png')} style={styles.iconImg} />
            <Text style={styles.navHeader}>PerfectPlates</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    backButton: {
        //padding: 10, // Ensure the touch area is large enough for usability
        textAlign: 'left',
        width: 40,
        height: 40,
        //marginBottom: 40,
    },
    iconImg: {
        width: 35,
        height: 35,
        marginLeft: 35
    },
    navText: {
        color: '#000', // Example text color
    },
    navHeader: {
        flex: 1,
        fontSize: 27,
        marginLeft: 10
    },
});

export default NavBar;
