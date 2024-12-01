import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import {getPreferenceFormData, storePreferences} from "@/api";
import {Option} from "commander";

export default function AllergyScreen() {
  const router = useRouter();

  const allergies = [
    { id: "1", title: "Dairy", icon: require("@/assets/images/dairy.png") },
    { id: "2", title: "Eggs", icon: require("@/assets/images/eggs.png") },
    { id: "3", title: "Tree Nuts", icon: require("@/assets/images/tree-nuts.png") },
    { id: "4", title: "Peanuts", icon: require("@/assets/images/peanut.png") },
    { id: "5", title: "Shellfish", icon: require("@/assets/images/shellfish.png") },
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
    const data = await getPreferenceFormData("allergy") as unknown as string[];
    if (data) {
      // check title from allergies data with id and set the title as the selected item
      setSelectedItem(
    allergies
        .filter((items) => data.includes(items.title)) // Ensure `items.title` is properly typed
        .map((allergy) => allergy.id)
      );
      setAllergyData(data as string[]);
      setQueriedOptions(data as string[]);
    }
  };

  fetchData().then(r => {});
}, []);

  const toggleSelection = (id: string) => {
    if (selectedItem.includes(id)) {
      setSelectedItem(selectedItem.filter((allergyId) => allergyId !== id));
      setAllergyData(allergyData.filter((allergy) => allergy !== allergies.find((allergy) => allergy.id === id)?.title));
    } else {
      setSelectedItem([...selectedItem, id]);
      if(allergies.find((allergy) => allergy.id === id)?.title){
        setAllergyData([...allergyData, allergies.find((allergy) => allergy.id === id)?.title] as string[]);
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
    // check from allergies data with id and remove its related title from the list
    const allergyTitle = allergies.find((allergy) => allergy.id === id)?.title;
    if (allergyTitle) {
      setAllergyData(allergyData.filter((allergy) => allergy !== allergyTitle));
    }
  };

  const renderAllergyItem = ({ item }: { item: { id: string; title: string; icon: any } }) => (
    <TouchableOpacity
      style={[
        styles.allergyItem,
        selectedItem.includes(item.id) && styles.selectedAllergyItem,
      ]}
      onPress={() => toggleSelection(item.id)}
    >
      {selectedItem.includes(item.id) && (
        <View style={styles.checkmark}>
          <View style={styles.checkmarkCircle}>
            <Text style={styles.checkmarkText}>✔</Text>
          </View>
        </View>
      )}

      <Image source={item.icon} style={styles.allergyIcon} />
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
          renderItem={(item) => renderAllergyItem(item)}
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

        <ScrollView horizontal style={styles.selectedItemContainer}>
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
        </ScrollView>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            if(allergyData !== queriedOptions) {
              storePreferences("allergy", allergyData).then(() => {
                    router.push("/splitOption")
                  }
              );
            }else {
              router.push("/splitOption");
            }
        }}>
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
    fontSize: 28,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
    textAlign: "left",
    marginTop: 35,
    marginBottom: 25,
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
  selectedItemContainer: {
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
});
