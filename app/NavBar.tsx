import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

type NavBarProps = {
    currentPage: 'home' | 'favorites' | 'calendar' | 'grocery' | 'profile';
    onNavigate: (page: string) => void;
};

const NavBar: React.FC<NavBarProps> = ({ currentPage, onNavigate }) => {
    return (
        <View style={styles.navBar}>
            {['home', 'favorites', 'calendar', 'grocery', 'profile'].map((page) => (
                <TouchableOpacity
                    key={page}
                    style={styles.navItem}
                    onPress={() => onNavigate(page)}
                >
                    <View style={[styles.navItemContainer, currentPage === page && styles.activeNavItem]}>
                        {currentPage === page && <View style={styles.activeIndicator} />}
                        <Image
                            source={getIcon(page)}
                            style={[
                                styles.icon,
                                currentPage === page ? styles.activeIcon : null,
                            ]}
                        />
                        <Text
                            style={[
                                styles.label,
                                currentPage === page ? styles.activeLabel : null,
                            ]}
                        >
                            {capitalize(page)}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const getIcon = (page: string) => {
    switch (page) {
        case 'home':
            return require('@/assets/images/home.png');
        case 'favorites':
            return require('@/assets/images/favorites.png');
        case 'calendar':
            return require('@/assets/images/calendar.png');
        case 'grocery':
            return require('@/assets/images/grocery.png');
        case 'profile':
            return require('@/assets/images/profile.png');
        default:
            return null;
    }
};

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 90,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#DDD',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },
    navItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        paddingTop: 10,
    },
    activeNavItem: {
        backgroundColor: '#F8F8F8',
        width: '100%',
        height: '100%',
    },
    activeIndicator: {
        position: 'absolute',
        top: -0.15,
        width: '100%',
        height: 3,
        backgroundColor: 'black',
        borderRadius: 2,
    },
    icon: {
        width: 24,
        height: 24,
    },
    activeIcon: {
        tintColor: '#000',
    },
    label: {
        marginTop: 4,
        fontSize: 12,
        color: '#737170',
        fontFamily: 'Poppins',
        marginBottom: 16,
    },
    activeLabel: {
        color: 'black',
        fontWeight: '500',
    },
});

export default NavBar;
