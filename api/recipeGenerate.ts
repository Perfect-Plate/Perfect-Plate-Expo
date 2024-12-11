import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface RecipeGenRequest {
    userDescription: string;
}

const RecipeGenerate = async (req: RecipeGenRequest) => {
    let {userDescription } = req;

      const retriveuser: any = await AsyncStorage.getItem("user");
        const user = JSON.parse(retriveuser);
    const user_id = user.email;
    const dates = new Date().toISOString();

    try {
        const response = await axios.post(
            "http://localhost:8000/v1/ai/generate_recipe/",
            {
                user_id,
                dates:[dates],
                userDescription,
                url: "",
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
            console.error("Error Generating recipe plan:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error:", error);
        }
    }
};

export default RecipeGenerate;
