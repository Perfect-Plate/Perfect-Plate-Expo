import axios from "axios";
import getPreferenceFormData from "@/api/get_preference_form_data";
import MealPlanGenerate from "@/api/mealPlan";

export interface PreferenceRequest {
    user_id: string;
    low_carb: boolean;
    high_protein: boolean;
    low_fat: boolean;
    low_sodium: boolean;
    low_calorie: boolean;
    keto: boolean;
    paleo: boolean;
    vegetarian: boolean;
    vegan: boolean;
    pescatarian: boolean;
    allergies: string[];
    preferred_cuisines: string[];
    restricted_cuisines: string[];
    preferred_meal_types: string[];
    restricted_meal_types: string[];
    preferred_ingredients: string[];
    restricted_ingredients: string[];
}

export interface LocalData {
        cuisine: { [key: string]: string },
        dietary: string[]
        allergy: string[],
        mealDescription: string,
        mealPlanCalendar: string[],
        meals: string[],
        nutrition: string[],
}

  const cuisines = [
    { id: "1", title: "American" },
    { id: "2", title: "Mexican" },
    { id: "3", title: "Chinese" },
    { id: "4", title: "Italian" },
    { id: "5", title: "Japanese" },
    { id: "6", title: "Thai" },
    { id: "7", title: "Indian" },
    { id: "8", title: "Mediterranean" },
  ];


const SavePreference = async (req: { localData: LocalData }) => {
    try {
        let localData = req.localData || {};
        if (typeof localData === "string") {
            localData = JSON.parse(localData);
        }
        const user = await getPreferenceFormData("signed_in") || { id: "" };

  const preferredCuisines = Object.entries(localData.cuisine || {})
    .filter(([_, value]) => value === "like")
    .map(([key]) => {
        const cuisine = cuisines.find(c => c.id === key);
        return cuisine ? cuisine.title : null;
    })
    .filter((title): title is string => title !== null); // Filter out null values and assert type

const restrictedCuisines = Object.entries(localData.cuisine || {})
    .filter(([_, value]) => value === "dislike")
    .map(([key]) => {
        const cuisine = cuisines.find(c => c.id === key);
        return cuisine ? cuisine.title : null;
    })
    .filter((title): title is string => title !== null); // Filter out null values and assert type


    // Construct the payload
    const payload: PreferenceRequest = {
        user_id: user.id,
        low_carb: localData.nutrition?.includes("Low Carb"),
        high_protein: localData.nutrition?.includes("High Protein"),
        low_fat: localData.nutrition?.includes("Low Fat"),
        low_sodium: localData.nutrition?.includes("Low Sodium"),
        low_calorie: localData.nutrition?.includes("Low Calorie"),
        keto: (localData.dietary || []).includes("Keto"),
        paleo: (localData.dietary || []).includes("Paleo"),
        vegetarian: (localData.dietary || []).includes("Vegetarian"),
        vegan: (localData.dietary || []).includes("Vegan"),
        pescatarian: (localData.dietary || []).includes("Pescatarian"),
        allergies: localData.allergy || [],
        preferred_cuisines: preferredCuisines,
        restricted_cuisines: restrictedCuisines,
        preferred_meal_types: localData.meals || [],
        restricted_meal_types: [],
        preferred_ingredients: [],
        restricted_ingredients: [],
    };

    console.log("SavePreference payload:", payload);

        const response = await axios.post(
            `http://127.0.0.1:8000/v1/user/users/${user.id}/preferences/`,
            payload,
            {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        let mealGenerateResponse;

        if (response?.status === 200) {
            mealGenerateResponse = await MealPlanGenerate({
                user_id: user.id,
                dates: localData.mealPlanCalendar,
                userDescription: localData.mealDescription,
                url: "",
            });
        }else {
            throw new Error(
                `SavePreference failed: ${
                    response?.data || response?.status
                }`
            );
        }
        //
        //
        if (mealGenerateResponse?.status !== 200) {
            throw new Error(
                `MealPlanGenerate failed: ${
                    mealGenerateResponse?.data?.detail || mealGenerateResponse?.status
                }`
            );
        }
        console.log("MealPlanGenerate response:", mealGenerateResponse);
        return mealGenerateResponse;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error saving preferences:", error.response || error.message);
            throw new Error(
                `SavePreference failed: ${
                    error.response?.data?.detail || error.message
                }`
            );
        } else {
            console.error("Unexpected error:", error);
            throw new Error("SavePreference encountered an unexpected error.");
        }
    }
};

export default SavePreference;
