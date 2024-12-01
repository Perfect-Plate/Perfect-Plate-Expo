import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import {router, useLocalSearchParams} from "expo-router";

const CalendarScreen = () => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dates = Array.from({ length: 30 }, (_, i) => i + 1); // Mock November dates
  const params = useLocalSearchParams();

  const renderDateCell = (item: any) => {
    return (
        <TouchableOpacity
            style={styles.dateCell}
            onPress={() => {
              router.push({
                pathname: "/recipeDetailsScreen",
                params: {data: item},
                });
            }
            }
        >
          <Text style={styles.dateText}>{item}</Text>
        </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.navArrow}>«</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>November 2024</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.navArrow}>»</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View style={styles.daysRow}>
        {days.map((day, index) => (
          <Text key={index} style={styles.dayText}>
            {day}
          </Text>
        ))}
      </View>
      <FlatList
        data={dates}
        keyExtractor={(item) => item.toString()}
        numColumns={7}
        renderItem={renderDateCell}
        contentContainerStyle={styles.calendarGrid}
      />
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F4F4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  navArrow: {
    fontSize: 24,
    color: "#1B1918",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1B1918",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    backgroundColor: "#FFF",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  calendarGrid: {
    paddingHorizontal: 8,
  },
  dateCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    aspectRatio: 1,
    backgroundColor: "#FFF",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1B1918",
  },
});
