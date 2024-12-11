import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import NavBar from "./NavBar";

const calendarEmpty: React.FC = () => {
  const today = new Date();
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    )
  );
  const [selectedDay, setSelectedDay] = useState<Date | null>(today); // Default selected day is today

  const getWeek = (startDate: Date) => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + i
      );
      week.push(day);
    }
    return week;
  };

  const isDaySelectable = (date: Date) => {
    const today = new Date();
    const twoWeeksLater = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 14
    );

    // Include current day explicitly
    return (
      date.toDateString() === today.toDateString() || // Ensure today is selectable
      (date >= today && date <= twoWeeksLater)
    );
  };

  const toggleDay = (date: Date) => {
    if (isDaySelectable(date)) {
      setSelectedDay(date); // Allow only one day to be selected
    }
  };

  const renderDay = (date: Date) => {
    const isSelected =
      selectedDay &&
      selectedDay.getDate() === date.getDate() &&
      selectedDay.getMonth() === date.getMonth() &&
      selectedDay.getFullYear() === date.getFullYear();
    const isSelectable = isDaySelectable(date);

    return (
      <TouchableOpacity
        key={date.getTime()}
        style={[
          styles.day,
          isSelected ? styles.daySelected : styles.dayDefault,
          !isSelectable && styles.dayNotSelectable,
        ]}
        onPress={() => toggleDay(date)}
        disabled={!isSelectable}
      >
        <Text style={isSelected ? styles.dayTextSelected : styles.dayText}>
          {date.getDate()}
        </Text>
        <Text style={styles.dayLabel}>
          {date.toLocaleDateString("en-US", { weekday: "short" })}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleWeekChange = (direction: "prev" | "next") => {
    setCurrentWeekStart((prev) => {
      const offset = direction === "next" ? 7 : -7;
      return new Date(
        prev.getFullYear(),
        prev.getMonth(),
        prev.getDate() + offset
      );
    });
  };

  const week = getWeek(currentWeekStart);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/background.png")}
          style={styles.headerImage}
        />
        <Text style={styles.headerText}>Your Meal Plans</Text>
        {/* Calendar */}
        <View style={styles.calendarSection}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity
              onPress={() => handleWeekChange("prev")}
              style={styles.navButton}
            >
              <Image
                source={require("@/assets/images/left.png")}
                style={styles.navIcon}
              />
            </TouchableOpacity>
            <Text style={styles.calendarMonth}>
              {week[0].toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </Text>
            <TouchableOpacity
              onPress={() => handleWeekChange("next")}
              style={styles.navButton}
            >
              <Image
                source={require("@/assets/images/right.png")}
                style={styles.navIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.weekRow}>
            {week.map((date) => renderDay(date))}
          </View>
        </View>
      </View>

      {/* Selected Date Display */}
      <View style={styles.selectedDateContainer}>
        <Text style={styles.selectedDateText}>
          {selectedDay
            ? selectedDay.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })
            : "None"}
        </Text>
      </View>

      {/* Centered Empty Image and Text */}
      <View style={styles.emptyContainer}>
        <Image
          source={require("@/assets/images/empty.png")}
          style={styles.emptyImage}
        />
        <Text style={styles.mealText}>Your meal plan is empty</Text>
        <Text style={styles.emptyText}>
          You haven’t set up a meal plan yet. Let’s create one and fill your
          calendar!
        </Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.generateButton}>
        <Text style={styles.generateButtonText}>Generate meal plan</Text>
      </TouchableOpacity>

      {/* Navigation Bar */}
      <NavBar currentPage="calendar" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE9E8",
  },
  header: {
    height: 292,
    padding: 16,
    justifyContent: "flex-end",
  },
  headerImage: {
    position: "absolute",
    width: "110%",
    height: 292,
    resizeMode: "cover",
  },
  headerText: {
    fontSize: 32,
    color: "#1B1918",
    fontFamily: "Poppins",
    fontWeight: "500",
    marginTop: 180,
    marginBottom: 10,
  },
  selectedDateContainer: {
    padding: 16,
    marginTop: 10,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 16,
  },
  mealText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#737170",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  generateButton: {
    height: 48,
    backgroundColor: "#F4A691",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 22,
    marginBottom: 28,
  },
  generateButtonText: {
    color: "#1B1918",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "500",
  },
  calendarSection: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  calendarMonth: {
    fontSize: 24,
    fontWeight: "500",
    color: "#333",
  },
  navButton: {
    padding: 10,
  },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  day: {
    width: 40,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  dayDefault: {
    backgroundColor: "#C5E47F",
  },
  daySelected: {
    backgroundColor: "#FFFFFF",
    borderColor: "#333",
    borderWidth: 1,
  },
  dayNotSelectable: {
    opacity: 0.3,
    backgroundColor: "white",
  },
  dayText: {
    fontSize: 16,
    color: "#333",
  },
  dayTextSelected: {
    fontSize: 16,
    color: "#000000", 
    fontWeight: "bold", // Optional: Make the text bold for better visibility
  },
  dayLabel: {
    fontSize: 12,
    color: "#737170",
    marginTop: 4,
  },
});

export default calendarEmpty;
