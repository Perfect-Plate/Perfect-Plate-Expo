import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const Label: React.FC<{ text: string }> = ({ text }) => (
  <Text style={styles.label}>{text}</Text>
);

const Counter: React.FC<{
  label: string;
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}> = ({ label, count, onIncrease, onDecrease }) => (
  <View style={styles.counterContainer}>
    <Label text={label} />
    <View style={styles.counterBox}>
      <TouchableOpacity style={styles.counterButtonMinus} onPress={onDecrease}>
        <Text style={styles.minusIcon}>{"-"}</Text>
      </TouchableOpacity>
      <View style={styles.counterValue}>
        <Text style={styles.counterText}>{count}</Text>
      </View>
      <TouchableOpacity style={styles.counterButtonPlus} onPress={onIncrease}>
        <Text style={styles.plusIcon}>{"+"}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const MealPlanningPortions: React.FC = () => {
  // State for counters
  const [adults, setAdults] = useState(0);
  const [kids, setKids] = useState(0);
  const [breakfast, setBreakfast] = useState(1);
  const [lunch, setLunch] = useState(1);
  const [dinner, setDinner] = useState(1);

  const router = useRouter();
  const { daysPlanned } = useLocalSearchParams(); // Retrieve `daysPlanned` from previous screen

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Meal Planning - Portions</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Section: How many people */}
        <View style={styles.section}>
          <Text style={styles.questionHeader}>How many people are you planning for?</Text>
          <Counter
            label="Adults:"
            count={adults}
            onIncrease={() => setAdults(adults + 1)}
            onDecrease={() => setAdults(Math.max(0, adults - 1))}
          />
          <Counter
            label="Kids:"
            count={kids}
            onIncrease={() => setKids(kids + 1)}
            onDecrease={() => setKids(Math.max(0, kids - 1))}
          />
        </View>

        {/* Section: How many dishes */}
        <View style={styles.section}>
          <Text style={styles.questionHeader}>How many dishes to include in each meal?</Text>
          <Counter
            label="Breakfast:"
            count={breakfast}
            onIncrease={() => setBreakfast(breakfast + 1)}
            onDecrease={() => setBreakfast(Math.max(0, breakfast - 1))}
          />
          <Counter
            label="Lunch:"
            count={lunch}
            onIncrease={() => setLunch(lunch + 1)}
            onDecrease={() => setLunch(Math.max(0, lunch - 1))}
          />
          <Counter
            label="Dinner:"
            count={dinner}
            onIncrease={() => setDinner(dinner + 1)}
            onDecrease={() => setDinner(Math.max(0, dinner - 1))}
          />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() =>
            router.push({
              pathname: "/addPreferences",
              params: {
                daysPlanned, // Pass `daysPlanned` from calendar.tsx
                adults,
                kids,
                breakfast,
                lunch,
                dinner, // Pass all counter values
              },
            })
          }
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE9E8",
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
  headerText: {
    fontSize: 20,
    fontFamily: "Poppins",
    fontWeight: "400",
    textAlign: "center",
    color: "#1B1918",
    marginTop: 50,
  },
  headerSpacer: {
    width: 30,
  },
  body: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    width: "100%",
    marginBottom: 45,
  },
  questionHeader: {
    fontSize: 28,
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "left",
    marginBottom: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#1B1918",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  counterBox: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    borderRadius: 4,
    overflow: "hidden",
  },
  counterButtonMinus: {
    width: 44,
    height: 44,
    backgroundColor: "#D9D7D7",
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonPlus: {
    width: 44,
    height: 44,
    backgroundColor: "#B9D774",
    justifyContent: "center",
    alignItems: "center",
  },
  minusIcon: {
    fontSize: 18,
    color: "#8F8F8F",
  },
  plusIcon: {
    fontSize: 18,
    color: "#1B1918",
  },
  counterValue: {
    width: 44,
    height: 44,
    backgroundColor: "#FAF8F7",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#CCCCCC",
  },
  counterText: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "#1B1918",
  },
  footer: {
    padding: 16,
    alignItems: "center",
  },
  continueButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#F4A691",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  continueText: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#1B1918",
  },
});

export default MealPlanningPortions;
