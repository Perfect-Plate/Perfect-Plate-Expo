import axios from "axios";
const GetMealPlanGenerate = async () => {
    // const { user_id, dates, userDescription, url } = req;

    try {
        const response = await axios.get(
            "http://localhost:8000/v1/ai/get_meal_plan/?user_id=Me%40pplate.com&meal_plan_id=96aab16e-aadf-413e-874d-068f0a73f0d1",
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

export default GetMealPlanGenerate;
