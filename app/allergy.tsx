import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function AllergyScreen() {
  const router = useRouter();
  const allergies = [
    { id: "1", title: "Eggs", icon: "🥚" },
    { id: "2", title: "Dairy", icon: "🥛" },
    { id: "3", title: "Wheat", icon: "🌾" },
    { id: "4", title: "Apple", icon: "🍎" },
    { id: "5", title: "Fish", icon: "🐟" },
    { id: "6", title: "Carrot", icon: "🥕" },
    { id: "7", title: "Soy", icon: "🌱" },
    { id: "8", title: "Lemon", icon: "🍋" },
    { id: "9", title: "Shellfish", icon: "🦐" },
  ];

  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const toggleSelection = (id: string) => {
    if (selectedAllergies.includes(id)) {
      setSelectedAllergies(selectedAllergies.filter((allergyId) => allergyId !== id));
    } else {
      setSelectedAllergies([...selectedAllergies, id]);
    }
  };

  const addCustomAllergy = () => {
    if (inputValue.trim() && !selectedAllergies.includes(inputValue)) {
      setSelectedAllergies([...selectedAllergies, inputValue]);
      setInputValue("");
    }
  };

  const removeSelectedAllergy = (id: string) => {
    setSelectedAllergies(selectedAllergies.filter((allergyId) => allergyId !== id));
  };

  const renderAllergyItem = ({ item }: { item: { id: string; title: string; icon: string } }) => (
    <TouchableOpacity
      style={[
        styles.allergyItem,
        selectedAllergies.includes(item.id) && styles.selectedAllergyItem,
      ]}
      onPress={() => toggleSelection(item.id)}
    >
      {selectedAllergies.includes(item.id) && (
        <View style={styles.checkmark}>
          <View style={styles.checkmarkCircle}>
            <Text style={styles.checkmarkText}>✔</Text>
          </View>
        </View>
      )}

      <Text style={styles.allergyIcon}>{item.icon}</Text>
      <Text style={styles.allergyText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dietary Restrictions</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Are there any ingredients you want to avoid?</Text>

        <FlatList
          data={allergies}
          renderItem={renderAllergyItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.allergyList}
        />

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

        <ScrollView horizontal style={styles.selectedAllergiesContainer}>
          {selectedAllergies
            .filter((id) => !allergies.some((allergy) => allergy.id === id))
            .map((id) => (
              <View key={id} style={styles.selectedBubble}>
                <Text style={styles.selectedText}>{id}</Text>
                <TouchableOpacity onPress={() => removeSelectedAllergy(id)}>
                  <Text style={styles.removeText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push("/splitOption")}
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
    backgroundColor: "#F5F5F5",
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
    fontSize: 20,
    fontFamily: "Poppins",
    fontWeight: "400",
    textAlign: "center",
    color: "#1B1918",
    marginTop: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
    textAlign: "center",
    marginBottom: 16,
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginHorizontal: 5,
    position: "relative",
  },
  selectedAllergyItem: {
    borderColor: "#A6C463",
    backgroundColor: "#E6F4E6",
  },
  allergyIcon: {
    fontSize: 24,
    marginBottom: 5,
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
  },
  insertBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    fontFamily: "Poppins",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#F4A691",
    borderRadius: 20,
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
  selectedAllergiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 100,
  },
  selectedBubble: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
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
  continueButton: {
    width: "100%",
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
