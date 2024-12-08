import React from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from "react-native";

interface OptionButtonProps {
  text: string;
  isSelected: boolean;
  onPress: () => void;
  icon?: ImageSourcePropType;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  text,
  isSelected,
  onPress,
  icon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, isSelected && styles.selected]}
    >
      <Text style={styles.text}>{text}</Text>
      {isSelected && icon && <Image source={icon} style={styles.checkmark} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF", //color for button background
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
    marginLeft: 20,
    marginRight: 20,
  },
  selected: {
    borderColor: "#B9D774", // Highlight color when selected
  },
  text: {
    flex: 1,
    fontSize: 18,
    color: "black",
    textAlign: "left",
    fontWeight: 500,
    fontStyle: "normal",
    fontFamily: "Poppins",
  },
  checkmark: {
    width: 40,
    height: 40,
    position: "absolute",
    right: 20,
  },
});

export default OptionButton;
