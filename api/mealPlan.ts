import axios from "axios";

export interface SignInRequest {
    user_id: string;
    dates: string[];
    userDescription: string;
    url?: string;
}

const MealPlanGenerate = async (req: SignInRequest) => {
    const { user_id, dates, userDescription, url } = req;

    try {
        const response = await axios.post(
            "http://localhost:8000/v1/ai/create_meal_plan/",
            {
                user_id,
                dates,
                userDescription,
                url
            },
            {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error Generating meal plan:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error:", error);
        }
    }
};

export default MealPlanGenerate;
