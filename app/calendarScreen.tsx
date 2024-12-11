import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import NavBar from "./NavBar";
import {router, useLocalSearchParams} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Type definition for the recipe
type Recipe = {
  id?: string;  // Make ID optional
  title: string;
  description: string;
  meal_type: string;
  image_url: string | null;
  ingredients: string[];
  instructions: string[];
};

// Type definition for the day's data
type DayData = {
  date: string;
  recipes: Recipe[];
};

const generateUniqueId = (item: Recipe, index: number): string => {
  // If ID already exists and is unique, return it
  if (item.id) return item.id;

  // Generate a unique ID based on title, meal type, and index
  return `${item.title}-${item.meal_type}-${index}`.replace(/\s+/g, '-').toLowerCase();
};

const calendarScreen: React.FC = () => {
  const searchParams = useLocalSearchParams();
  const mealPlan = searchParams.mealPlan ? JSON.parse(searchParams.mealPlan as string) : null;
  const today = new Date();
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    )
  );
  const [selectedDay, setSelectedDay] = useState<Date | null>(today);
  const [mealData, setMealData] = useState<DayData[]>([]);

  // Fetch meal data (replace with actual API call)
  useEffect(() => {
    if(!mealPlan) {
      const fetchMealsFromLocalStorage = async () => {
        const mealPlanLocal:any = await AsyncStorage.getItem("mealPlan");
        const mealPlanLocalData = JSON.parse(mealPlanLocal);
        if (!mealPlanLocalData) {
          return;
        }
        setMealData(mealPlanLocalData.days);
      };
      fetchMealsFromLocalStorage().then(r => {});
    } else {
      const jsonData = {
        days: mealPlan.days,
      };
      setMealData(jsonData.days);
    }
  }, []);

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

    // If no meal plan, default to 2 weeks
    if (!mealData || mealData.length === 0) {
      const twoWeeksLater = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 14
      );

      return (
        date.toDateString() === today.toDateString() ||
        (date >= today && date <= twoWeeksLater)
      );
    }

    // Find the first and last dates in the meal plan
    const planDates = mealData.map(day => new Date(day.date));
    const firstPlanDate = new Date(Math.min(...planDates.map(d => d.getTime())));
    const lastPlanDate = new Date(Math.max(...planDates.map(d => d.getTime())));

    // Extend the selectable range to the plan's date range
    return (
      date.toDateString() === today.toDateString() ||
      (date >= firstPlanDate && date <= lastPlanDate)
    );
  };

  const toggleDay = (date: Date) => {
    if (isDaySelectable(date)) {
      setSelectedDay(date);
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

  const getRecipesForSelectedDay = () => {
    if (!selectedDay) return [];

    const formattedDate = selectedDay.toISOString().split('T')[0];
    const dayData = mealData.find(day => 
      new Date(day.date).toISOString().split('T')[0] === formattedDate
    );

    return dayData ? dayData.recipes : [];
  };

  const groupRecipesByMealType = (recipes: Recipe[]) => {
    return {
      Breakfast: recipes.filter(r => r.meal_type === 'Breakfast'),
      Lunch: recipes.filter(r => r.meal_type === 'Lunch'),
      Dinner: recipes.filter(r => r.meal_type === 'Dinner')
    };
  };

  const week = getWeek(currentWeekStart);
  const recipesForSelectedDay = getRecipesForSelectedDay();
  const groupedRecipes = groupRecipesByMealType(recipesForSelectedDay);

  // Modify the Section component to use unique IDs
  const Section: React.FC<{
    title: string;
    items: Recipe[];
  }> = ({ title, items }) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.sectionContent}>
        {items.length > 0 ? (
          items.map((item, index) => {
            // Generate or ensure a unique ID
            const uniqueId = generateUniqueId(item, index);
            
            return (
              <TouchableOpacity
                key={uniqueId}
                onPress={() => {
                  // Ensure the item has an ID before stringifying
                  const itemToPass = {
                    ...item,
                    id: uniqueId
                  };
                  router.push(
                    {
                      pathname: "/recipeDetailsScreen",
                      params: {recipe: JSON.stringify(itemToPass)},
                    }
                  )
                }}
              >
                <View style={styles.itemContainer}>
                  {/* Placeholder image since image_url is null in the data */}
                  <Image 
                    style={styles.recipeImage} 
                    source={require("@/assets/images/1.png")} 
                  />
                  <View style={styles.textContainer}>
                    <Text
                      style={styles.recipeName}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {item.title}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.moreIconContainer}>
                    <Image
                      style={styles.moreIcon}
                      source={require("@/assets/images/more.png")}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View>
              <Text style={styles.noMealsText}>No meals planned</Text>
          </View>
        )}
      </View>
    </View>
  );

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

      {/* Scrollable Body */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        {
          groupedRecipes.Breakfast.length > 0 && groupedRecipes.Lunch && groupedRecipes.Dinner ? (
            (
              <>
          <Section
          title="Breakfast"
          items={groupedRecipes.Breakfast}
        />
        <Section
          title="Lunch"
          items={groupedRecipes.Lunch}
        />
        <Section
          title="Dinner"
          items={groupedRecipes.Dinner}
        />
              </>
            )
          ) : (
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
          )
        }
        
      </ScrollView>

      {/* Floating Meal Plan Section */}
      <View style={styles.mealPlanSection}>
        <TouchableOpacity style={styles.generateButton}>
          <Text style={styles.generateButtonText}>Generate more meals</Text>
        </TouchableOpacity>
      </View>

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
      marginTop: 10,
      padding: 16,
    },
    selectedDateText: {
      fontSize: 18,
      fontWeight: "500",
      color: "#333",
    },
    body: {
      flex: 1,
      marginTop: 10,
    },
    section: {
      marginBottom: 16,
      paddingHorizontal: 16,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 22,
      color: "#1B1918",
      fontFamily: "Poppins",
      fontWeight: "500",
    },
    sectionContent: {
      marginTop: -10,
      flexDirection: "column",
      gap: 8,
    },
    itemContainer: {
      flexDirection: "row",
      backgroundColor: "#FFF",
      borderRadius: 12,
      overflow: "hidden",
      elevation: 2,
      marginBottom: 8,
      alignItems: "center",
    },
    recipeImage: {
      width: 144,
      height: 80,
      resizeMode: "cover",
    },
    textContainer: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    recipeName: {
      fontSize: 16,
      fontWeight: "500",
      color: "#333",
      lineHeight: 22,
    },
    moreIconContainer: {
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
    moreIcon: {
      width: 40,
      height: 15,
      resizeMode: "contain",
    },
    mealPlanSection: {
      position: "absolute",
      bottom: 80,
      left: 16,
      right: 16,
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      marginBottom: 20,
    },
    generateButton: {
      backgroundColor: "#F4A691",
      borderRadius: 40,
      paddingVertical: 8,
      paddingHorizontal: 32,
      height: 48,
      width: 350,
      marginTop: 4,
    },
    generateButtonText: {
      fontSize: 18,
      color: "#141412",
      fontFamily: "Poppins",
      fontWeight: "500",
      marginLeft: 50,
      marginTop: 4,
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
      backgroundColor: "#F4A691",
      color: "black",
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
      color: "black",
      fontWeight: "bold",
    },
    dayLabel: {
      fontSize: 12,
      color: "#737170",
      marginTop: 4,
    },
    noMealsText: {
      textAlign: 'center',
      color: '#888',
      padding: 15,
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
  });
  
  export default calendarScreen;
  