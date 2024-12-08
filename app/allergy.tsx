import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { getPreferenceFormData, storePreferences } from "@/api";

export default function AllergyScreen() {
  const router = useRouter();
  const allergies = [
    { id: "1", title: "Dairy", icon: require("@/assets/images/dairy.png") },
    { id: "2", title: "Eggs", icon: require("@/assets/images/eggs.png") },
    {
      id: "3",
      title: "Tree Nuts",
      icon: require("@/assets/images/tree-nuts.png"),
    },
    { id: "4", title: "Peanuts", icon: require("@/assets/images/peanut.png") },
    {
      id: "5",
      title: "Shellfish",
      icon: require("@/assets/images/shellfish.png"),
    },
    { id: "6", title: "Wheat", icon: require("@/assets/images/wheat.png") },
    { id: "7", title: "Soy", icon: require("@/assets/images/soy.png") },
    { id: "8", title: "Fish", icon: require("@/assets/images/fish.png") },
    { id: "9", title: "Sesame", icon: require("@/assets/images/sesame.png") },
  ];

  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [allergyData, setAllergyData] = useState<string[]>([]);
  const [queriedOptions, setQueriedOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPreferenceFormData("allergy");
      if (data) {
        setSelectedItem(
          allergies
            .filter((items) => data.includes(items.title))
            .map((allergy) => allergy.id)
        );
        setAllergyData(data as string[]);
        setQueriedOptions(data as string[]);
      }
    };
    fetchData();
  }, []);

  const toggleSelection = (id: string) => {
    if (selectedItem.includes(id)) {
      setSelectedItem(selectedItem.filter((allergyId) => allergyId !== id));
      setAllergyData(
        allergyData.filter(
          (allergy) =>
            allergy !== allergies.find((allergy) => allergy.id === id)?.title
        )
      );
    } else {
      setSelectedItem([...selectedItem, id]);
      const title = allergies.find((allergy) => allergy.id === id)?.title;
      if (title) {
        setAllergyData([...allergyData, title]);
      }
    }
  };

  const addCustomAllergy = () => {
    if (inputValue.trim() && !selectedItem.includes(inputValue)) {
      setSelectedItem([...selectedItem, inputValue]);
      setAllergyData([...allergyData, inputValue]);
      setInputValue("");
    }
  };

  const removeSelectedAllergy = (id: string) => {
    setSelectedItem(selectedItem.filter((allergyId) => allergyId !== id));
    const allergyTitle = allergies.find((allergy) => allergy.id === id)?.title;
    if (allergyTitle) {
      setAllergyData(allergyData.filter((allergy) => allergy !== allergyTitle));
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dietary Restrictions</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>
          Are there any ingredients you want to avoid?
        </Text>

        {/* Allergy Items */}
        <View style={[styles.allergyList]}>
          {Array.from(
            { length: Math.ceil(allergies.length / 3) },
            (_, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {allergies.slice(rowIndex * 3, rowIndex * 3 + 3).map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.allergyItem,
                      selectedItem.includes(item.id) &&
                        styles.selectedAllergyItem,
                    ]}
                    onPress={() => toggleSelection(item.id)}
                  >
                    {selectedItem.includes(item.id) && (
                      <Image
                        source={require("@/assets/images/check.png")}
                        style={styles.checkIcon}
                      />
                    )}
                    <Image source={item.icon} style={styles.allergyIcon} />
                    <Text style={styles.allergyText}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )
          )}
        </View>

        <Text style={styles.insertBarDescription}>Add more restrictions:</Text>

        <View style={styles.insertBarContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add an allergy..."
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={addCustomAllergy}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Custom Added Allergies */}
        <View style={styles.selectedItemContainer}>
          {selectedItem
            .filter((id) => !allergies.some((allergy) => allergy.id === id))
            .map((id) => (
              <View key={id} style={styles.selectedBubble}>
                <Text style={styles.selectedText}>{id}</Text>
                <TouchableOpacity onPress={() => removeSelectedAllergy(id)}>
                  <Text style={styles.removeText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            if (allergyData !== queriedOptions) {
              storePreferences("allergy", allergyData).then(() =>
                router.push("/splitOption")
              );
            } else {
              router.push("/splitOption");
            }
          }}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE9E8",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  continueButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#F4A691",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
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
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "400",
    textAlign: "center",
    color: "#1B1918",
    marginTop: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
    textAlign: "left",
    marginTop: 32,
    marginBottom: 24,
  },
  allergyList: {
    paddingBottom: 1,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  allergyItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginHorizontal: 5,
    position: "relative",
  },
  selectedAllergyItem: {
    borderColor: "#A6C463",
    backgroundColor: "#E6F4E6",
  },
  checkIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
  },
  allergyIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
    resizeMode: "contain",
  },
  allergyText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#1B1918",
  },
  checkmark: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#A6C463",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkCircle: {
    width: 12,
    height: 12,
    backgroundColor: "#B9D774",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: "#1B1918",
    fontSize: 10,
    fontWeight: "bold",
  },
  insertBarDescription: {
    fontSize: 18,
    fontFamily: "Poppins",
    color: "#1B1918",
    marginBottom: 8,
    marginTop: 40,
  },
  insertBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 48,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    fontFamily: "Poppins",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#F4A691",
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#1B1918",
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: "500",
  },
  selectedItemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 100,
  },
  selectedBubble: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: "#FFF",
  },
  selectedText: {
    fontSize: 14,
    color: "#1B1918",
    fontFamily: "Poppins",
  },
  removeText: {
    fontSize: 18,
    color: "#1B1918",
    marginLeft: 5,
  },
});
