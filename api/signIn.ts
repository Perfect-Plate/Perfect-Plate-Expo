import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface SignInRequest {
    email: string;
    password: string;
}

const signIn = async (req: SignInRequest) => {
    const { email, password } = req;
    try {
        const response = await axios.post(
            `http://127.0.0.1:8000/v1/user/signin/?email=${email}&password=${password}`,
            {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.status == 200) {
            await AsyncStorage.setItem("user", JSON.stringify({
                status: "true",
                email,
                username: response.data.username
            }));
        }
            return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error signing in:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error:", error);
        }
    }
};

export default signIn;
